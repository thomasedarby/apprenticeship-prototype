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

const formSteps = Array.from(document.querySelectorAll('.form-step'));
const progressSegments = Array.from(document.querySelectorAll('.progress-segment'));
const backButton = document.querySelector('#back-step');
const nextButton = document.querySelector('#next-step');

if (formSteps.length && progressSegments.length && backButton && nextButton) {
	let currentStep = 0;

	// Keep the visible step, progress bar, and button states in sync.
	const renderStep = () => {
		formSteps.forEach((step, index) => {
			step.hidden = index !== currentStep;
		});

		progressSegments.forEach((segment, index) => {
			segment.classList.remove('is-complete', 'is-current');
			if (index < currentStep) {
				segment.classList.add('is-complete');
			}
			if (index === currentStep) {
				segment.classList.add('is-current');
			}
		});

		backButton.disabled = currentStep === 0;
		nextButton.textContent = currentStep === formSteps.length - 1 ? 'Finish' : 'Next';
	};

	nextButton.addEventListener('click', () => {
		if (currentStep < formSteps.length - 1) {
			currentStep += 1;
			renderStep();
		} else {
			// Prototype: redirect to the success confirmation page on finish
			window.location.href = 'success.html';
		}
	});

	backButton.addEventListener('click', () => {
		if (currentStep > 0) {
			currentStep -= 1;
			renderStep();
		}
	});

	renderStep();
}

// Step 2: show/hide manual address fields based on radio selection
const locationRadios = document.querySelectorAll('input[name="location-method"]');
const manualFields = document.querySelector('.location-manual-fields');

if (locationRadios.length && manualFields) {
	locationRadios.forEach((radio) => {
		radio.addEventListener('change', () => {
			const isManual = radio.value === 'manual' && radio.checked;
			manualFields.setAttribute('aria-hidden', isManual ? 'false' : 'true');
		});
	});
}
