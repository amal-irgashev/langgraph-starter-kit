/**
 * Shared animation configurations for consistent motion across components
 */

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30
};

export const scaleHoverTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17
}; 