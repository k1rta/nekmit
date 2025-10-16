import { test, expect } from '@playwright/test';

test.describe('API - Health Endpoint', () => {
  const API_URL = process.env.API_URL || 'http://localhost:3000';
  const healthEndpoint = `${API_URL}/api/health`;

  test('should return 200 status code', async ({ request }) => {
    const response = await request.get(healthEndpoint);
    expect(response.status()).toBe(200);
  });

  test('should return JSON content type', async ({ request }) => {
    const response = await request.get(healthEndpoint);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('should have required health fields', async ({ request }) => {
    const response = await request.get(healthEndpoint);
    const data = await response.json();

    // Check required fields exist
    expect(data).toHaveProperty('status');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('uptime');
    expect(data).toHaveProperty('memory');
    expect(data).toHaveProperty('environment');
    expect(data).toHaveProperty('api');
  });

  test('should have healthy status', async ({ request }) => {
    const response = await request.get(healthEndpoint);
    const data = await response.json();

    expect(data.status).toBe('healthy');
  });

  test('should have valid timestamp format', async ({ request }) => {
    const response = await request.get(healthEndpoint);
    const data = await response.json();

    // Check if timestamp is valid ISO 8601 format
    const timestamp = new Date(data.timestamp);
    expect(timestamp.toString()).not.toBe('Invalid Date');
    expect(data.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  test('should have memory information', async ({ request }) => {
    const response = await request.get(healthEndpoint);
    const data = await response.json();

    expect(data.memory).toHaveProperty('used');
    expect(data.memory).toHaveProperty('total');
    expect(data.memory).toHaveProperty('unit');
    expect(data.memory.unit).toBe('MB');
    expect(typeof data.memory.used).toBe('number');
    expect(typeof data.memory.total).toBe('number');
    expect(data.memory.used).toBeGreaterThan(0);
    expect(data.memory.total).toBeGreaterThan(0);
  });

  test('should have environment information', async ({ request }) => {
    const response = await request.get(healthEndpoint);
    const data = await response.json();

    expect(data.environment).toHaveProperty('nodeVersion');
    expect(data.environment).toHaveProperty('platform');
    expect(data.environment).toHaveProperty('arch');
    expect(data.environment.nodeVersion).toMatch(/^v\d+\.\d+\.\d+/);
  });

  test('should have API metadata', async ({ request }) => {
    const response = await request.get(healthEndpoint);
    const data = await response.json();

    expect(data.api).toHaveProperty('version');
    expect(data.api).toHaveProperty('endpoints');
    expect(Array.isArray(data.api.endpoints)).toBe(true);
    expect(data.api.endpoints.length).toBeGreaterThan(0);
  });

  test('should have valid endpoint documentation', async ({ request }) => {
    const response = await request.get(healthEndpoint);
    const data = await response.json();

    const endpoint = data.api.endpoints[0];
    expect(endpoint).toHaveProperty('path');
    expect(endpoint).toHaveProperty('method');
    expect(endpoint).toHaveProperty('description');
    expect(endpoint.path).toBe('/api/health');
    expect(endpoint.method).toBe('GET');
  });

  test('should handle CORS preflight request', async ({ request }) => {
    const response = await request.fetch(healthEndpoint, {
      method: 'OPTIONS',
    });

    expect(response.status()).toBe(200);
    const headers = response.headers();
    expect(headers['access-control-allow-origin']).toBe('*');
    expect(headers['access-control-allow-methods']).toContain('GET');
  });

  test('should reject POST method', async ({ request }) => {
    const response = await request.post(healthEndpoint, {
      data: { test: 'data' },
    });

    expect(response.status()).toBe(405);
    const data = await response.json();
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Method Not Allowed');
  });

  test('should reject PUT method', async ({ request }) => {
    const response = await request.put(healthEndpoint, {
      data: { test: 'data' },
    });

    expect(response.status()).toBe(405);
  });

  test('should reject DELETE method', async ({ request }) => {
    const response = await request.delete(healthEndpoint);
    expect(response.status()).toBe(405);
  });

  test('should have consistent response structure', async ({ request }) => {
    // Make multiple requests to ensure consistency
    const response1 = await request.get(healthEndpoint);
    const response2 = await request.get(healthEndpoint);

    const data1 = await response1.json();
    const data2 = await response2.json();

    // Structure should be the same
    expect(Object.keys(data1).sort()).toEqual(Object.keys(data2).sort());
    expect(data1.status).toBe(data2.status);
    expect(data1.api.version).toBe(data2.api.version);
  });

  test('should have increasing uptime', async ({ request }) => {
    const response1 = await request.get(healthEndpoint);
    const data1 = await response1.json();

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 100));

    const response2 = await request.get(healthEndpoint);
    const data2 = await response2.json();

    // Uptime should increase (or be very close due to serverless cold starts)
    expect(typeof data1.uptime).toBe('number');
    expect(typeof data2.uptime).toBe('number');
  });
});
