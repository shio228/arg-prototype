export async function sha256(text: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyUser(
  inputId: string,
  inputPassword: string
): Promise<boolean> {
  const res = await fetch('/data/authors.json');
  const users: { id: string; passwordHash: string }[] = await res.json();
  const user = users.find((u) => u.id === inputId);
  if (!user) return false;
  const hash = await sha256(inputPassword);
  return hash === user.passwordHash;
}
