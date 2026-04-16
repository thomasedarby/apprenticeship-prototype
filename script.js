const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileBackdrop = document.querySelector('.mobile-menu-backdrop');

if (navToggle && mobileMenu && mobileBackdrop) {
	const closeMenu = () => {
		navToggle.classList.remove('is-open');
		navToggle.setAttribute('aria-expanded', 'false');
		navToggle.setAttribute('aria-label', 'Open menu');
		mobileMenu.classList.remove('is-open');
		mobileMenu.setAttribute('aria-hidden', 'true');
	};

	const openMenu = () => {
		navToggle.classList.add('is-open');
		navToggle.setAttribute('aria-expanded', 'true');
		navToggle.setAttribute('aria-label', 'Close menu');
		mobileMenu.classList.add('is-open');
		mobileMenu.setAttribute('aria-hidden', 'false');
	};

	navToggle.addEventListener('click', () => {
		const isOpen = navToggle.classList.contains('is-open');
		if (isOpen) {
			closeMenu();
			return;
		}
		openMenu();
	});

	mobileBackdrop.addEventListener('click', closeMenu);

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth > 960) {
			closeMenu();
		}
	});
}
