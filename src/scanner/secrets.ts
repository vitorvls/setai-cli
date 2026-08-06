/**
 * Secret / sensitive path protection for the project scanner.
 * Detect existence only — never read contents into context.
 */

const SECRET_BASENAME_PATTERNS = [
  /^\.env$/,
  /^\.env\..+$/,
  /\.pem$/i,
  /\.key$/i,
  /\.p12$/i,
  /\.pfx$/i,
  /credentials/i,
  /secret/i,
  /^id_rsa$/,
  /^id_ed25519$/,
  /\.keystore$/i,
];

const SECRET_PATH_FRAGMENTS = [
  '/.ssh/',
  '\\.ssh\\',
  '/secrets/',
  '\\secrets\\',
];

export function isSecretPath(relativePath: string): boolean {
  const normalized = relativePath.replace(/\\/g, '/');
  const base = normalized.split('/').pop() ?? normalized;

  if (SECRET_BASENAME_PATTERNS.some((re) => re.test(base))) {
    return true;
  }
  if (SECRET_PATH_FRAGMENTS.some((f) => normalized.toLowerCase().includes(f.replace(/\\/g, '/')))) {
    return true;
  }
  // .npmrc may contain auth tokens — existence ok, content not for context
  if (base === '.npmrc') {
    return true;
  }
  return false;
}

export function isEnvConfigPath(relativePath: string): boolean {
  const base = relativePath.replace(/\\/g, '/').split('/').pop() ?? '';
  return /^\.env(\..+)?$/.test(base);
}
