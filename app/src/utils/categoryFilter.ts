/**
 * カテゴリーフィルタの初期化と管理
 */
export function initCategoryFilter(): void {
  const buttons = document.querySelectorAll('.tab-button');

  buttons.forEach((button) => {
    button.addEventListener('click', handleCategoryClick);
  });
}

function handleCategoryClick(event: Event): void {
  const target = event.target as HTMLElement;
  const category = target.getAttribute('data-category') || 'All';

  updateActiveButton(target);
  filterCards(category);
}

function updateActiveButton(activeButton: HTMLElement): void {
  document.querySelectorAll('.tab-button').forEach((btn) => {
    btn.classList.remove('active');
  });
  activeButton.classList.add('active');
}

function filterCards(category: string): void {
  document.querySelectorAll('[data-category]').forEach((card) => {
    // タブボタン自体は除外
    if (card.classList.contains('tab-button')) return;

    const cardElement = card as HTMLElement;
    const cardCategory = card.getAttribute('data-category');

    if (category === 'All' || cardCategory === category) {
      cardElement.style.display = 'block';
    } else {
      cardElement.style.display = 'none';
    }
  });
}
