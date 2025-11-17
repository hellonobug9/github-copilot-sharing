// 01-quick-and-inline-chat/index.ts

type UserRole = 'Student' | 'Teacher' | 'Parent' | 'Admin';

interface User {
  id: string;
  name: string;
  role: UserRole;
  isActive: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface DiscountRule {
  role: UserRole;
  minTotal: number;
  percent: number; // e.g. 0.1 = 10%
}

/**
 * Fake data for demo
 */
const demoUser: User = {
  id: 'u1',
  name: 'Summer',
  role: 'Teacher',
  isActive: true,
};

const demoCart: CartItem[] = [
  { id: 'b1', name: 'Book A', price: 10, quantity: 2 },
  { id: 'b2', name: 'Book B', price: 25, quantity: 1 },
  { id: 'b3', name: 'Book C', price: 7.5, quantity: 3 },
];

const discountRules: DiscountRule[] = [
  { role: 'Teacher', minTotal: 30, percent: 0.15 },
  { role: 'Student', minTotal: 20, percent: 0.1 },
  { role: 'Parent', minTotal: 40, percent: 0.05 },
];

/**
 * ❌ Intentionally messy function for Inline Chat demo
 *
 * Inline Chat demo idea:
 * - Ask Copilot to refactor this function to be more readable.
 * - Ask it to extract smaller helper functions.
 * - Ask it to improve naming but keep behavior the same.
 */
export function calculateDiscountedTotal(
  cart: CartItem[],
  user: User,
  rules: DiscountRule[],
): number {
  // Very verbose and repetitive on purpose
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    if (item && item.price > 0) {
      total = total + item.price * item.quantity;
    } else {
      // ignore invalid items
    }
  }

  let discountPercent = 0;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (!rule) continue;

    // nested if chain on purpose
    if (rule.role === user.role) {
      if (total >= rule.minTotal) {
        if (rule.percent > discountPercent) {
          discountPercent = rule.percent;
        } else {
          // do nothing
        }
      } else {
        // not enough total, no discount from this rule
      }
    } else {
      // user role does not match this rule
    }
  }

  let finalTotal = total - total * discountPercent;

  // another weird condition just to make code more "fun"
  if (!user.isActive) {
    // Inactive users should not get any discount
    finalTotal = total;
  } else {
    // keep finalTotal as is
  }

  return finalTotal;
}

/**
 * ❌ Slightly awkward function for Inline Chat demo:
 * - Add a new role (e.g. "Guest")
 * - Ask Copilot to simplify the branching logic
 */
export function getUserGreeting(user: User): string {
  let greeting = '';

  if (user.role === 'Teacher') {
    greeting = `Hello Teacher ${user.name}!`;
  } else if (user.role === 'Student') {
    if (user.isActive) {
      greeting = `Hi ${user.name}, ready to learn today?`;
    } else {
      greeting = `Hi ${user.name}, please contact support to activate your account.`;
    }
  } else if (user.role === 'Parent') {
    greeting = `Welcome, ${user.name}. Thanks for supporting your child.`;
  } else if (user.role === 'Admin') {
    greeting = `Good day, Admin ${user.name}.`;
  } else {
    greeting = `Hello ${user.name}.`;
  }

  // Intentionally strange extra condition to clean up
  if (!user.name) {
    greeting = 'Hello there.';
  }

  return greeting;
}

/**
 * ✅ Simple helper for Quick Chat demo:
 * - Use Quick Chat to ask: "What is the time complexity of this?"
 * - Or: "Can we make this more efficient?"
 */
export function countActiveUsersByRole(users: User[]): Record<UserRole, number> {
  const result: Record<UserRole, number> = {
    Student: 0,
    Teacher: 0,
    Parent: 0,
    Admin: 0,
  };

  for (const user of users) {
    if (user.isActive) {
      result[user.role] = result[user.role] + 1;
    }
  }

  return result;
}

/**
 * Tiny "demo runner" so you can run `ts-node` or `node` (after build)
 */
function main() {
  const total = calculateDiscountedTotal(demoCart, demoUser, discountRules);
  const greeting = getUserGreeting(demoUser);
  const counts = countActiveUsersByRole([
    demoUser,
    { ...demoUser, id: 'u2', role: 'Student' },
    { ...demoUser, id: 'u3', role: 'Student', isActive: false },
  ]);

  console.log('Greeting:', greeting);
  console.log('Final total with discount:', total);
  console.log('Active users by role:', counts);
}

main();
