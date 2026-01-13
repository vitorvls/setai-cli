/**
 * Template Helpers - Funções de inferência inteligente para templates
 * 
 * Estas funções inferem valores baseados no stack tecnológico e informações do projeto,
 * reduzindo placeholders "[A definir]" e tornando os arquivos gerados mais úteis.
 */

/**
 * Infere o runtime baseado na linguagem
 */
export function inferRuntime(language: string): string {
  const runtimeMap: Record<string, string> = {
    'TypeScript': 'Node.js',
    'JavaScript': 'Node.js',
    'Python': 'Python',
    'Go': 'Go',
    'Rust': 'Rust',
  };
  return runtimeMap[language] || '[To be defined]';
}

/**
 * Infere o sistema de módulos baseado na linguagem
 */
export function inferModuleSystem(language: string): string {
  if (language === 'TypeScript' || language === 'JavaScript') {
    return 'ESM (ES Modules)';
  }
  if (language === 'Python') {
    return 'Python modules';
  }
  return '[To be defined]';
}

/**
 * Infere a ferramenta de build baseada na linguagem e framework
 */
export function inferBuildTool(language: string, framework?: string): string {
  if (language === 'TypeScript') {
    if (framework === 'Next.js') return 'Next.js built-in';
    if (framework === 'React' || framework === 'Vue' || framework === 'Angular') {
      return 'Vite (recommended) or Webpack';
    }
    return 'tsup (recommended) or tsc';
  }
  if (language === 'JavaScript') {
    if (framework === 'Next.js') return 'Next.js built-in';
    return 'Vite or Webpack';
  }
  if (language === 'Python') {
    return 'setuptools or poetry';
  }
  return '[To be defined]';
}

/**
 * Infere o framework de testes baseado na linguagem e preferência TDD
 */
export function inferTestFramework(language: string, useTDD: boolean): string {
  if (language === 'TypeScript' || language === 'JavaScript') {
    return useTDD ? 'Vitest (recommended for TDD) or Jest' : 'Vitest or Jest';
  }
  if (language === 'Python') {
    return 'pytest (recommended)';
  }
  if (language === 'Go') {
    return 'testing package (built-in)';
  }
  if (language === 'Rust') {
    return 'cargo test (built-in)';
  }
  return '[To be defined]';
}

/**
 * Infere o tipo de projeto baseado no framework e descrição
 */
export function inferProjectType(framework: string, description: string): string {
  const desc = description.toLowerCase();
  
  if (framework === 'Express' || desc.includes('api') || desc.includes('rest')) {
    return 'REST API';
  }
  if (framework === 'Next.js' || desc.includes('web app') || desc.includes('website')) {
    return 'Web Application';
  }
  if (framework === 'React' || framework === 'Vue' || framework === 'Angular' || desc.includes('frontend')) {
    return 'Frontend Application';
  }
  if (framework === 'FastAPI' || framework === 'Django' || framework === 'Flask') {
    return 'API or Web Application';
  }
  return 'Application';
}

/**
 * Infere o estilo arquitetural baseado no framework
 */
export function inferArchitecturalStyle(framework: string): string {
  const styleMap: Record<string, string> = {
    'Express': 'Layered Architecture (Controller-Service-Repository)',
    'Next.js': 'Full-stack with App Router or Pages Router',
    'React': 'Component-based Architecture',
    'Vue': 'Component-based Architecture',
    'Angular': 'Module-based Architecture',
    'FastAPI': 'Layered Architecture with dependency injection',
    'Django': 'Model-View-Template (MVT) Architecture',
    'Flask': 'Layered Architecture',
  };
  return styleMap[framework] || 'Layered Architecture';
}

/**
 * Infere o padrão de comunicação baseado no tipo de projeto
 */
export function inferCommunicationPattern(projectType: string): string {
  if (projectType === 'REST API') {
    return 'REST API - Synchronous HTTP requests/responses using JSON format';
  }
  if (projectType === 'Web Application') {
    return 'HTTP/HTTPS - Client-server communication via HTTP requests';
  }
  if (projectType === 'Frontend Application') {
    return 'HTTP/HTTPS - Communication with backend APIs via HTTP requests';
  }
  return '[To be defined - How do system components communicate? REST API, GraphQL, messaging, events, etc.]';
}

/**
 * Infere o modelo de interação baseado no tipo de projeto
 */
export function inferInteractionModel(projectType: string): string {
  if (projectType === 'REST API') {
    return 'Synchronous - Request/Response pattern with HTTP status codes';
  }
  if (projectType === 'Web Application') {
    return 'Synchronous - Request/Response pattern with server-side rendering or client-side rendering';
  }
  if (projectType === 'Frontend Application') {
    return 'Synchronous - Request/Response pattern with API calls';
  }
  return '[To be defined - System interaction model: synchronous, asynchronous, events, polling, etc.]';
}

/**
 * Infere o método de autenticação baseado no tipo de projeto
 */
export function inferAuthMethod(projectType: string): string {
  if (projectType === 'REST API') {
    return 'JWT (JSON Web Tokens) - Stateless authentication with token-based access';
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return 'JWT or Session-based authentication - Choose based on requirements';
  }
  return '[To be defined - How is authentication done? JWT, OAuth, sessions, etc.]';
}

/**
 * Infere o método de autorização baseado no tipo de projeto
 */
export function inferAuthorization(projectType: string): string {
  if (projectType === 'REST API') {
    return `**Role-Based Access Control (RBAC)**

**Implementation:**
- Define roles (e.g., admin, user, guest)
- Assign permissions to roles
- Check user role/permissions on protected endpoints
- Use middleware to enforce authorization

**Common Patterns:**
- **Role-based:** User has one or more roles (admin, moderator, user)
- **Permission-based:** User has specific permissions (read:users, write:posts)
- **Resource-based:** User can access specific resources (own posts, own profile)

**Best Practices:**
- Implement authorization middleware for Express routes
- Store roles/permissions in JWT token or database
- Validate permissions on every protected endpoint
- Use principle of least privilege (users get minimum required permissions)
- Log authorization failures for security monitoring`;
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return `**Role-Based Access Control (RBAC)**

**Implementation:**
- Define roles (e.g., admin, user, guest)
- Assign permissions to roles
- Check user role/permissions on protected routes/components
- Hide/show UI elements based on user permissions

**Common Patterns:**
- **Role-based:** User has one or more roles
- **Permission-based:** User has specific permissions
- **Resource-based:** User can access specific resources

**Best Practices:**
- Validate permissions on both client and server side
- Never trust client-side authorization alone
- Use server-side API to enforce authorization
- Store roles/permissions in JWT token or session`;
  }
  return '[To be defined - How is authorization managed? RBAC, permissions, roles, etc.]';
}

/**
 * Infere o cliente de banco de dados baseado no banco escolhido
 */
export function inferDatabaseClient(database: string): string {
  const clientMap: Record<string, string> = {
    'PostgreSQL': 'pg (node-postgres) or Prisma ORM',
    'MySQL': 'mysql2 or Prisma ORM',
    'MongoDB': 'mongodb or mongoose',
    'SQLite': 'better-sqlite3 or Prisma ORM',
    'Supabase': 'Supabase client library or Prisma',
  };
  return clientMap[database] || '[To be defined]';
}

/**
 * Infere a plataforma de deploy baseada no framework
 */
export function inferDeploymentPlatform(framework: string): string {
  if (framework === 'Express') {
    return 'Railway (recommended), Render, AWS Elastic Beanstalk, DigitalOcean App Platform, or Heroku';
  }
  if (framework === 'Next.js') {
    return 'Vercel (recommended), Netlify, or AWS Amplify';
  }
  if (framework === 'React' || framework === 'Vue' || framework === 'Angular') {
    return 'Vercel, Netlify, or AWS S3 + CloudFront';
  }
  if (framework === 'FastAPI' || framework === 'Django' || framework === 'Flask') {
    return 'Railway, Render, AWS Elastic Beanstalk, or DigitalOcean App Platform';
  }
  return '[To be defined]';
}

/**
 * Infere a ferramenta de CI/CD
 */
export function inferCICDTool(): string {
  return 'GitHub Actions (recommended), GitLab CI, or CircleCI';
}

/**
 * Gera lista de ferramentas de teste baseada no stack
 */
export function generateTestToolsList(
  language: string,
  framework: string,
  database?: string
): string {
  const tools: string[] = [];
  
  if (language === 'TypeScript' || language === 'JavaScript') {
    tools.push('- **Unit Tests:** Vitest or Jest');
    
    if (framework === 'Express') {
      tools.push('- **API Tests:** Supertest (for Express endpoints)');
    }
    if (framework === 'Next.js') {
      tools.push('- **E2E Tests:** Playwright or Cypress');
    }
    if (framework === 'React' || framework === 'Vue' || framework === 'Angular') {
      tools.push('- **Component Tests:** Testing Library');
      tools.push('- **E2E Tests:** Playwright or Cypress');
    }
    
    if (database) {
      tools.push('- **Database Tests:** Use test database with migrations');
    }
  } else if (language === 'Python') {
    tools.push('- **Unit Tests:** pytest');
    tools.push('- **E2E Tests:** pytest with requests or httpx');
    if (database) {
      tools.push('- **Database Tests:** Use test database with fixtures');
    }
  }
  
  return tools.length > 0 ? tools.join('\n') : '[To be defined]';
}

/**
 * Gera padrões de segurança baseados no tipo de projeto
 */
export function generateSecurityPatterns(projectType: string): string {
  if (projectType === 'REST API') {
    return `- **Input Validation:** Use validation libraries (zod, joi, class-validator, express-validator)
- **SQL Injection Prevention:** Use parameterized queries or ORM (Prisma, TypeORM)
- **XSS Prevention:** Sanitize all user inputs
- **Rate Limiting:** Implement rate limiting middleware (express-rate-limit)
- **CORS:** Configure CORS properly for production (allow only trusted origins)
- **HTTPS:** Always use HTTPS in production
- **Authentication:** JWT with secure token storage (httpOnly cookies or secure headers)
- **Authorization:** Role-based access control (RBAC)
- **Security Headers:** Use helmet.js for Express applications
- **Environment Variables:** Never commit secrets, use environment variables`;
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return `- **Input Validation:** Validate all user inputs on both client and server
- **XSS Prevention:** Sanitize user-generated content
- **CSRF Protection:** Implement CSRF tokens
- **HTTPS:** Always use HTTPS in production
- **Content Security Policy:** Configure CSP headers
- **Authentication:** Secure authentication flow with proper token handling
- **Environment Variables:** Never commit API keys or secrets`;
  }
  return '[To be defined - Security constraints specific to the project: input validation, sanitization, HTTPS, etc.]';
}

/**
 * Infere Source of Truth baseado no tipo de projeto e database
 */
export function inferSourceOfTruth(projectType: string, database: string): string {
  if (projectType === 'REST API' && database) {
    return `${database} database - Primary source of truth for all data. All data operations (create, read, update, delete) go through the database. The database is the single source of truth, ensuring data consistency and integrity.`;
  }
  if (projectType === 'REST API' && !database) {
    return 'External APIs or file storage - Data is fetched from external sources or stored in files. External APIs serve as the source of truth.';
  }
  if (projectType === 'Web Application' && database) {
    return `${database} database - Primary source of truth. Client-side state is derived from server state. The database holds the authoritative data, and the frontend reflects this state.`;
  }
  if (projectType === 'Frontend Application') {
    return 'Backend API - The frontend consumes data from backend APIs. The backend (and its database) is the source of truth.';
  }
  return '[To be defined - Where is the source of truth for data? Database, external APIs, files, etc.]';
}

/**
 * Infere Caching Strategy baseado no tipo de projeto
 */
export function inferCachingStrategy(projectType: string, database: string): string {
  if (projectType === 'REST API') {
    const strategies = [
      '**API Response Caching:** Cache frequently accessed API responses (e.g., GET /api/tasks) to reduce database load and improve response times',
      '**Database Query Caching:** Cache expensive database queries using Redis or in-memory cache (e.g., complex joins, aggregations)',
      '**TTL Strategy:** Use appropriate TTL based on data freshness requirements (e.g., 5 minutes for frequently changing data, 1 hour for relatively static data)',
      '**Cache Invalidation:** Implement cache invalidation on data mutations (POST, PUT, DELETE) to ensure data consistency',
      '**Cache Keys:** Use consistent cache key patterns (e.g., `api:tasks:${id}`) for easy invalidation',
    ];
    if (database === 'PostgreSQL' || database === 'MySQL') {
      strategies.push('**Connection Pooling:** Use connection pooling to reduce database load and improve performance');
    }
    if (database === 'MongoDB') {
      strategies.push('**MongoDB Query Optimization:** Use indexes and query optimization to reduce database load');
    }
    return strategies.join('\n');
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return `**Client-side Caching:**
- **Browser Cache:** Use HTTP cache headers (Cache-Control, ETag) for static assets
- **Service Worker:** Implement service worker for offline caching (if applicable)
- **API Response Caching:** Cache API responses in memory or localStorage for frequently accessed data
- **Cache Invalidation:** Clear cache on user actions that modify data`;
  }
  return '[To be defined - Caching strategy: when to use, where to store, TTL, invalidation, etc.]';
}

/**
 * Infere State Management baseado no tipo de projeto
 */
export function inferStateManagement(projectType: string): string {
  if (projectType === 'REST API') {
    return `**Server-side state only** - REST APIs are stateless by design. Each request is independent and contains all information needed to process it.

**State Storage:**
- **Database:** Persistent state is stored in the database
- **Session State:** If needed, store in JWT tokens (stateless) or external session store (Redis, etc.)
- **No Server Memory State:** Avoid storing state in server memory (breaks statelessness and scalability)

**Best Practices:**
- All stateful data goes to the database
- Authentication state in JWT tokens (stateless)
- No server-side sessions unless absolutely necessary`;
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return `**Client-side state management** - State is managed on the client side.

**State Management Options:**
- **React Context API:** For simple global state
- **Redux/Zustand:** For complex state management
- **Local Component State:** For component-specific state
- **Server State:** Fetched via API calls, managed with React Query, SWR, or similar

**Best Practices:**
- Server state (from APIs) should be the source of truth
- Client state is derived from server state
- Use appropriate state management library based on complexity`;
  }
  return '[To be defined - How is state managed? Redux, Context API, Zustand, local state, etc.]';
}

/**
 * Infere Logging Strategy baseado no tipo de projeto e framework
 */
export function inferLoggingStrategy(projectType: string, framework: string): string {
  if (projectType === 'REST API' && framework === 'Express') {
    return `**Structured Logging:** Use winston or pino for structured JSON logs

**Log Levels:**
- **error:** Critical errors that require immediate attention
- **warn:** Warnings that should be investigated
- **info:** General information about application flow
- **debug:** Detailed debugging information (development only)

**Log Format:**
- **Production:** JSON format for easy parsing and aggregation
- **Development:** Human-readable format for easier debugging

**Log Storage:**
- Send logs to centralized logging service (e.g., Datadog, LogRocket, CloudWatch, or cloud provider logs)
- Store logs in files for local development
- Use log rotation to manage disk space

**Request Logging:**
- Log all API requests with correlation IDs for tracing
- Include: method, path, status code, response time, user ID (if authenticated)

**Error Logging:**
- Log full error context including stack traces (in development)
- In production, log sanitized errors (no sensitive data, no full stack traces to clients)`;
  }
  if (projectType === 'REST API') {
    return `**Structured Logging:** Use appropriate logging library for your framework

**Log Levels:** error, warn, info, debug
**Log Format:** JSON for production, human-readable for development
**Log Storage:** Centralized logging service or file-based with rotation
**Request Logging:** Log all API requests with correlation IDs`;
  }
  return '[To be defined - Logging strategy: where, format, levels, retention, etc.]';
}

/**
 * Infere Monitoring Metrics baseado no tipo de projeto
 */
export function inferMonitoringMetrics(projectType: string): string {
  if (projectType === 'REST API') {
    return `**Key Metrics to Monitor:**

**API Performance:**
- Response time percentiles (p50, p95, p99)
- Throughput (requests per second)
- Error rate by endpoint
- Request latency distribution

**Database Performance:**
- Query execution time
- Connection pool usage
- Slow query count
- Database connection errors

**Infrastructure:**
- CPU usage
- Memory usage
- Disk I/O
- Network traffic

**Business Metrics:**
- Request volume by endpoint
- Active users
- Feature usage
- API version adoption

**Recommended Tools:**
- **Application Performance Monitoring (APM):** New Relic, Datadog, Sentry, or similar
- **Infrastructure Monitoring:** Cloud provider monitoring (AWS CloudWatch, Google Cloud Monitoring, Azure Monitor)
- **Custom Dashboards:** Grafana with Prometheus or similar
- **Error Tracking:** Sentry, Rollbar, or similar`;
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return `**Key Metrics to Monitor:**

**Frontend Performance:**
- Page load time
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)

**User Experience:**
- Error rate
- User sessions
- Feature usage
- Conversion rates

**Recommended Tools:**
- **Performance Monitoring:** Google Analytics, Web Vitals, or similar
- **Error Tracking:** Sentry, LogRocket, or similar
- **User Analytics:** Mixpanel, Amplitude, or similar`;
  }
  return '[To be defined - Monitoring: tools, important metrics, dashboards, etc.]';
}

/**
 * Infere Alerts & Incident Handling baseado no tipo de projeto
 */
export function inferAlertsIncidentHandling(projectType: string): string {
  if (projectType === 'REST API') {
    return `**Alert Conditions:**

**Critical Alerts (Immediate Action Required):**
- Error rate > 5% for any endpoint
- Response time p95 > 2 seconds
- Database connection failures
- Service unavailable (5xx errors > 10%)
- Memory usage > 90%

**Warning Alerts (Investigation Needed):**
- Error rate > 1% for any endpoint
- Response time p95 > 1 second
- High memory usage (> 80%)
- Database query time > 500ms
- Unusual traffic patterns

**Alert Channels:**
- **Critical:** PagerDuty, Slack #alerts, email, SMS
- **Warning:** Slack #monitoring, email

**Incident Response:**
- Document runbooks for common issues
- Set up on-call rotation
- Use correlation IDs to trace requests across services
- Have rollback procedures ready
- Document escalation paths`;
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return `**Alert Conditions:**

**Critical Alerts:**
- Error rate > 5%
- Page load time > 5 seconds
- Service unavailable

**Warning Alerts:**
- Error rate > 1%
- Page load time > 3 seconds
- Unusual user behavior patterns

**Alert Channels:**
- Slack, email, or monitoring dashboard notifications`;
  }
  return '[To be defined - Alerts: when to trigger, channels, runbooks, etc.]';
}

/**
 * Infere Expected Scale baseado no tipo de projeto
 */
export function inferExpectedScale(projectType: string): string {
  if (projectType === 'REST API') {
    return `**Initial Scale (MVP):**
- **Users:** 100-1,000 active users
- **Requests:** 100-1,000 requests per minute (RPM)
- **Data Volume:** < 10GB initially
- **Concurrent Connections:** 50-200

**Growth Phase:**
- **Users:** 1,000-10,000 active users
- **Requests:** 1,000-10,000 requests per minute (RPM)
- **Data Volume:** 10GB-100GB
- **Concurrent Connections:** 200-1,000

**Scale Considerations:**
- Design for horizontal scaling from the start
- Use stateless architecture (REST APIs are stateless by design)
- Database connection pooling is essential
- Consider caching layer early (Redis) for frequently accessed data
- Monitor database query performance and optimize slow queries`;
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return `**Initial Scale (MVP):**
- **Users:** 100-1,000 active users
- **Page Views:** 1,000-10,000 per day
- **Data Volume:** < 5GB initially
- **API Calls:** 10,000-100,000 per day

**Growth Phase:**
- **Users:** 1,000-10,000 active users
- **Page Views:** 10,000-100,000 per day
- **Data Volume:** 5GB-50GB
- **API Calls:** 100,000-1,000,000 per day

**Scale Considerations:**
- CDN for static assets (images, CSS, JS)
- Client-side caching for API responses
- Optimize bundle size and lazy loading
- Monitor Core Web Vitals (LCP, FID, CLS)`;
  }
  return '[To be defined - Expected scale: number of users, requests per second, data volume, etc.]';
}

/**
 * Infere Scaling Strategy baseado no tipo de projeto e framework
 */
export function inferScalingStrategy(projectType: string, framework: string): string {
  if (projectType === 'REST API') {
    const strategies = [
      '**Horizontal Scaling (Primary Strategy):**',
      '- Add more application server instances behind a load balancer',
      '- Stateless design allows easy horizontal scaling',
      '- Use container orchestration (Docker + Kubernetes, Railway, Render) for auto-scaling',
      '',
      '**Database Scaling:**',
      '- Start with single database instance',
      '- Use connection pooling to maximize database efficiency',
      '- As load increases: implement read replicas for read-heavy workloads',
      '- Consider database sharding only if truly necessary (usually not needed until very large scale)',
      '',
      '**Caching Layer:**',
      '- Implement Redis or similar for API response caching',
      '- Cache frequently accessed data to reduce database load',
      '- Use cache invalidation strategies to maintain data consistency',
      '',
      '**CDN (if serving static content):**',
      '- Use CDN for static assets (images, documents) if applicable',
      '- Reduces server load and improves response times globally',
    ];

    if (framework === 'Express') {
      strategies.push(
        '',
        '**Express-Specific Scaling:',
        '- Use PM2 or similar process manager for multi-core utilization',
        '- Implement clustering (Node.js cluster module) for better CPU utilization',
        '- Use reverse proxy (Nginx) for load balancing and SSL termination',
        '- Monitor event loop lag to identify bottlenecks'
      );
    }

    return strategies.join('\n');
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return `**Client-Side Optimization:**
- Code splitting and lazy loading
- Bundle optimization and tree shaking
- Image optimization and lazy loading
- Service worker for offline caching (if applicable)

**CDN for Static Assets:**
- Serve all static assets (JS, CSS, images) via CDN
- Use CDN edge locations for global distribution
- Cache static assets with long TTL

**API Scaling:**
- Backend API should scale horizontally (see REST API scaling strategy)
- Implement API rate limiting to prevent abuse
- Use API caching where appropriate

**Build & Deployment:**
- Optimize build process for production
- Use incremental builds and caching
- Deploy to CDN or edge network for global distribution`;
  }
  return '[To be defined - Scaling strategy: horizontal, vertical, auto-scaling, CDN, etc.]';
}

/**
 * Infere Failure Handling baseado no tipo de projeto
 */
export function inferFailureHandling(projectType: string): string {
  if (projectType === 'REST API') {
    return `**Error Handling Strategy:**

**HTTP Error Responses:**
- Use appropriate HTTP status codes (400, 401, 403, 404, 500, etc.)
- Return consistent error response format:
  \`\`\`json
  {
    "error": {
      "code": "ERROR_CODE",
      "message": "Human-readable error message",
      "details": {} // Optional additional context
    }
  }
  \`\`\`

**Retry Logic:**
- **Transient Errors (5xx):** Implement exponential backoff retry for client requests
- **Database Connection Errors:** Automatic retry with exponential backoff
- **External API Calls:** Retry with exponential backoff (3-5 attempts)
- **Rate Limiting (429):** Respect Retry-After header

**Circuit Breaker Pattern:**
- Implement circuit breaker for external service calls
- Prevents cascading failures when external services are down
- Use libraries like opossum (Node.js) or similar

**Graceful Degradation:**
- Return cached data if available when primary source fails
- Provide partial responses when possible
- Log all failures for monitoring and debugging

**Database Failure Handling:**
- Use database connection pooling with retry logic
- Implement transaction rollback on errors
- Use database replication for high availability (read replicas)

**Monitoring & Alerting:**
- Log all errors with full context (request ID, user ID, stack trace)
- Set up alerts for error rate thresholds
- Monitor database connection pool usage
- Track external API call failures`;
  }
  if (projectType === 'Web Application' || projectType === 'Frontend Application') {
    return `**Error Handling Strategy:**

**Client-Side Error Handling:**
- Display user-friendly error messages
- Never expose technical error details to users
- Implement error boundaries (React) or similar patterns
- Log errors to error tracking service (Sentry, LogRocket)

**API Error Handling:**
- Handle API errors gracefully
- Show appropriate messages based on error type
- Implement retry logic for transient errors (network issues)
- Provide fallback UI when API is unavailable

**Offline Handling:**
- Detect offline status
- Show offline indicator to users
- Queue actions when offline, sync when online (if applicable)
- Use service worker for offline functionality (if applicable)

**Error Recovery:**
- Allow users to retry failed actions
- Provide clear next steps when errors occur
- Maintain user state during errors (don't lose user input)`;
  }
  return '[To be defined - How are failures handled? Retry, circuit breaker, fallback, rollback, etc.]';
}

/**
 * Gera configuração TypeScript básica
 */
export function generateTypeScriptConfig(strictMode: boolean): string {
  return `{
  "compilerOptions": {
    "strict": ${strictMode},
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  }
}`;
}

/**
 * Gera configuração ESLint recomendada
 */
export function generateESLintConfig(language: string, framework: string): string {
  if (language === 'TypeScript' || language === 'JavaScript') {
    const config: string[] = [];
    config.push('```json');
    config.push('{');
    config.push('  "extends": [');
    config.push('    "eslint:recommended"');
    
    if (language === 'TypeScript') {
      config.push('    ,"@typescript-eslint/recommended"');
      config.push('    ,"@typescript-eslint/recommended-requiring-type-checking"');
    }
    
    if (framework === 'Express') {
      config.push('    ,"plugin:node/recommended"');
    }
    if (framework === 'React') {
      config.push('    ,"plugin:react/recommended"');
      config.push('    ,"plugin:react-hooks/recommended"');
    }
    
    config.push('  ],');
    config.push('  "parserOptions": {');
    if (language === 'TypeScript') {
      config.push('    "project": "./tsconfig.json"');
    } else {
      config.push('    "ecmaVersion": 2022,');
      config.push('    "sourceType": "module"');
    }
    config.push('  }');
    config.push('}');
    config.push('```');
    return config.join('\n');
  }
  return '[To be defined]';
}

/**
 * Infere a ferramenta de cobertura de testes
 */
export function inferCoverageTool(testFramework: string): string {
  if (testFramework.includes('Vitest')) {
    return 'v8 (built-in with Vitest)';
  }
  if (testFramework.includes('Jest')) {
    return 'v8 or istanbul (built-in with Jest)';
  }
  if (testFramework.includes('pytest')) {
    return 'pytest-cov';
  }
  return '[To be defined]';
}
