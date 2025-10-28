import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('Health API Tests', () => {
  test.beforeEach(async () => {
    await allure.epic('API');
    await allure.feature('Health Endpoint');
  });

  test('should return healthy status', async ({ request }) => {
    await allure.story('Health Check');
    await allure.severity('critical');
    
    const response = await request.get('/api/health');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body).toHaveProperty('status', 'healthy');
    expect(body).toHaveProperty('timestamp');
    expect(body).toHaveProperty('uptime');
    
    await allure.attachment('Health Response', JSON.stringify(body, null, 2), 'application/json');
  });

  test('should respond within acceptable time', async ({ request }) => {
    await allure.story('Response Time');
    await allure.severity('normal');
    
    const startTime = Date.now();
    const response = await request.get('/api/health');
    const responseTime = Date.now() - startTime;
    
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
    
    await allure.attachment('Response Time', `${responseTime}ms`, 'text/plain');
  });
});
