// ============================================
// UTILITY FUNCTIONS - FUNCTIONAL PROGRAMMING
// ============================================

/**
 * Combines class names, filtering out falsy values
 */
export const cn = (...classes: (string | boolean | undefined | null)[]): string =>
    classes.filter(Boolean).join(' ');

/**
 * Generates a unique ID
 */
export const generateId = (): string =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

/**
 * Delays execution for a specified duration
 */
export const delay = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

/**
 * Formats a date string to a readable format
 */
export const formatDate = (date: string | Date): string =>
    new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });

/**
 * Truncates text to a specified length
 */
export const truncate = (text: string, maxLength: number): string =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

/**
 * Debounces a function call
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
    fn: T,
    ms: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), ms);
    };
};
