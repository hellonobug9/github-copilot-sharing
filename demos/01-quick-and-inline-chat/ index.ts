// 01-quick-and-inline-chat/index.ts

type Product = {
  name: string;
  price: number;
  quantity: number;
};

const demoProducts: Product[] = [
  { name: 'Book', price: 10, quantity: 2 },
  { name: 'Pen', price: 2, quantity: 3 },
];

/**
 * ❌ Function cố tình viết hơi xấu để demo Inline Chat.
 *
 * Dùng Inline Chat với prompt ví dụ:
 * "Refactor this function to be more readable. Keep the behavior exactly the same."
 */
export function calculateTotalPrice(products: Product[]): number {
  let total = 0;

  // Vòng lặp hơi rối • cố ý để refactor
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    if (p) {
      if (p.price > 0) {
        total = total + p.price * p.quantity;
      } else {
        // ignore item có price <= 0
      }
    } else {
      // ignore null / undefined
    }
  }

  // Giảm giá ngớ ngẩn cho vui (demo)
  if (total > 30) {
    total = total - 5;
  } else {
    if (total > 20) {
      total = total - 2;
    }
  }

  return total;
}

/**
 * ✅ Function đơn giản để demo Quick Chat.
 *
 * Đây là ví dụ handler search siêu basic.
 * Dùng Quick Chat để hỏi về BEST PRACTICES cho search,
 * không yêu cầu Copilot sửa code.
 *
 * Ví dụ prompt Quick Chat:
 * "In this file I have a simple handleSearchChange function that just logs the value.
 * What are some best practices for handling search input in a frontend app?
 * Mention things like debounce, minimum length, and how to avoid too many requests."
 */
export function handleSearchChange(value: string) {
  console.log('Search keyword:', value);
}

/**
 * Tiny runner cho vui.
 */
function main() {
  const total = calculateTotalPrice(demoProducts);
  handleSearchChange('copilot');

  console.log('Total:', total);
}

main();
