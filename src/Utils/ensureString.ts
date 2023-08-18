export function ensureString(value: string | string[] | undefined) {
    return typeof value === 'string' ? value : '';
}