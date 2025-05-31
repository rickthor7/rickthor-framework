document.addEventListener('DOMContentLoaded', () => {
    console.log('Futuristic UI Framework Initialized - DOM Ready');

    // --- Navbar Toggle Logic ---
    const navbarToggleBtn = document.getElementById('navbarToggleBtn');
    const navbarLinks = document.querySelector('.navbar-links');
    if (navbarToggleBtn && navbarLinks) {
        navbarToggleBtn.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            const iconBars = navbarToggleBtn.querySelectorAll('.icon-bar');
            if (navbarLinks.classList.contains('active')) {
                iconBars[0].style.transform = 'rotate(-45deg) translate(-4px, 5px)';
                iconBars[1].style.opacity = '0';
                iconBars[2].style.transform = 'rotate(45deg) translate(-4px, -5px)';
            } else {
                iconBars[0].style.transform = 'none';
                iconBars[1].style.opacity = '1';
                iconBars[2].style.transform = 'none';
            }
        });
    }

    // --- Modal Logic ---
    const openModalBtn = document.getElementById('openModalBtn'); // Pastikan ada tombol dengan ID ini di HTML jika mau tes Modal
    const closeModalBtn = document.getElementById('closeModalBtn'); // ID dari tombol close di dalam modal
    const modalOverlay = document.getElementById('myModalOverlay'); // ID dari overlay modal
    const modalActionBtn = document.getElementById('modalActionBtn'); // Tombol aksi di modal
    const modalCancelBtn = document.getElementById('modalCancelBtn'); // Tombol cancel di modal

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }

    if (openModalBtn && modalOverlay) {
        openModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (modalActionBtn) {
        modalActionBtn.addEventListener('click', () => {
            console.log('Modal action confirmed!'); // Ganti dengan aksi nyata
            closeModal();
        });
    }
    if (modalCancelBtn) { // Jika ada tombol cancel spesifik selain close 'X'
        modalCancelBtn.addEventListener('click', closeModal);
    }
    if (modalOverlay) { // Klik di luar modal untuk menutup
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // --- Tabs Logic ---
    const tabContainers = document.querySelectorAll('.tabs-futuristic');
    tabContainers.forEach(container => {
        const tabLinks = container.querySelectorAll('.tab-link');
        const tabPanes = container.querySelectorAll('.tab-pane');
        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (link.disabled) return;
                tabLinks.forEach(l => l.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                link.classList.add('active');
                const targetPaneId = link.getAttribute('data-tab');
                const targetPane = container.querySelector('#' + targetPaneId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    });

    // --- Accordion Logic ---
    const accordionItems = document.querySelectorAll('.accordion-futuristic .accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const indicator = header.querySelector('.accordion-indicator');

        if (item.classList.contains('active')) { // Initial state for pre-opened items
            content.style.maxHeight = content.scrollHeight + "px";
            if (indicator) indicator.textContent = '[-]';
        }

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Optional: Close other active items (classic accordion behavior)
            // accordionItems.forEach(otherItem => {
            //   if (otherItem !== item && otherItem.classList.contains('active')) {
            //     otherItem.classList.remove('active');
            //     otherItem.querySelector('.accordion-content').style.maxHeight = null;
            //     if (otherItem.querySelector('.accordion-indicator')) {
            //        otherItem.querySelector('.accordion-indicator').textContent = '[+]';
            //     }
            //   }
            // });
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                if (indicator) indicator.textContent = '[-]';
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                if (indicator) indicator.textContent = '[+]';
                content.style.maxHeight = null;
            }
        });
    });

    // --- Slider Value Display & Track Fill Update ---
    function setupFuturisticSlider(sliderId, outputId) {
        const slider = document.getElementById(sliderId);
        const output = document.getElementById(outputId);
        if (slider && output) {
            function updateSliderDisplay() {
                const value = slider.value;
                const max = slider.max || 100; // Default max if not set
                const min = slider.min || 0;   // Default min if not set
                const percent = ((value - min) / (max - min)) * 100;
                output.textContent = value;
                slider.style.setProperty('--slider-fill-percent', percent + '%');
            }
            updateSliderDisplay(); // Initial call
            slider.addEventListener('input', updateSliderDisplay);
        }
    }
    setupFuturisticSlider('energySlider', 'sliderValueOutput');
    setupFuturisticSlider('thresholdSlider', 'thresholdValueOutput');


    // --- Date/Time Picker Basic Logic ---
    const dateTimeInputTrigger = document.querySelector('#futuristicDateTime'); // ID input utama
    const dateTimeInputIcon = document.querySelector('.datetime-input-trigger .calendar-icon-trigger');
    const pickerContainer = document.getElementById('futuristicPickerContainer');

    const dateSection = pickerContainer?.querySelector('.datepicker-section');
    const timeSection = pickerContainer?.querySelector('.timepicker-section');
    const modeToggles = pickerContainer?.querySelectorAll('.picker-mode-toggle');

    const pickerSetBtn = document.getElementById('pickerSetBtn');
    const pickerCancelBtn = document.getElementById('pickerCancelBtn');
    const currentMonthYearDisplay = pickerContainer?.querySelector('.current-month-year');
    const datepickerGrid = pickerContainer?.querySelector('.datepicker-grid');

    let currentDisplayedDate = new Date(2025, 4, 31); // Default ke Mei 2025 (indeks bulan 0-11)

    function openDateTimePicker() {
        if (pickerContainer) {
            pickerContainer.classList.add('active');
            renderCalendar(); // Render kalender saat dibuka
        }
    }
    function closeDateTimePicker() {
        if (pickerContainer) pickerContainer.classList.remove('active');
    }

    if (dateTimeInputTrigger) dateTimeInputTrigger.addEventListener('click', openDateTimePicker);
    if (dateTimeInputIcon) dateTimeInputIcon.addEventListener('click', openDateTimePicker);
    if (pickerSetBtn) {
        pickerSetBtn.addEventListener('click', () => {
            // Implementasi pengambilan nilai tanggal & waktu terpilih
            const selectedDateCell = datepickerGrid?.querySelector('.date-cell.selected');
            const day = selectedDateCell ? selectedDateCell.textContent : 'DD';
            const monthYear = currentMonthYearDisplay ? currentMonthYearDisplay.textContent : 'MONTH YEAR';
            // Ambil nilai waktu
            const hour = pickerContainer?.querySelector('.time-segment:nth-child(1) .time-input')?.value || 'HH';
            const minute = pickerContainer?.querySelector('.time-segment:nth-child(3) .time-input')?.value || 'MM';
            const ampmToggle = pickerContainer?.querySelector('.ampm-segment .ampm-toggle.active');
            const ampm = ampmToggle ? ampmToggle.textContent : '';

            // Format tanggal dan waktu (contoh sederhana)
            // Untuk bulan, kita perlu mapping dari nama bulan ke angka jika ingin format numerik
            // Misal: "MAY 2025", tanggal 31 -> "31 MAY 2025"
            // Atau, "2025-05-31" jika bulan dikonversi
            // const formattedDate = `${day} ${monthYear}`; // Ini masih perlu perbaikan format
            const formattedDateTime = `${day} ${monthYear} at ${hour}:${minute} ${ampm}`;

            if (dateTimeInputTrigger && selectedDateCell) {
                dateTimeInputTrigger.value = formattedDateTime;
            } else if (dateTimeInputTrigger) {
                 dateTimeInputTrigger.value = `Time: ${hour}:${minute} ${ampm}`; // Jika hanya waktu yg dipilih
            }
            console.log('Set Date/Time: ', formattedDateTime);
            closeDateTimePicker();
        });
    }
    if (pickerCancelBtn) pickerCancelBtn.addEventListener('click', closeDateTimePicker);

    if (modeToggles && dateSection && timeSection) {
        modeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                modeToggles.forEach(t => t.classList.remove('active'));
                toggle.classList.add('active');
                if (toggle.dataset.mode === 'date') {
                    dateSection.classList.add('visible-section');
                    timeSection.classList.remove('visible-section');
                } else {
                    timeSection.classList.add('visible-section');
                    dateSection.classList.remove('visible-section');
                }
            });
        });
    }
    document.addEventListener('click', (event) => { // Klik di luar untuk menutup
        if (!pickerContainer || !dateTimeInputTrigger) return;
        const isClickInsidePicker = pickerContainer.contains(event.target);
        const isClickOnTrigger = dateTimeInputTrigger.contains(event.target) || dateTimeInputIcon?.contains(event.target);
        if (!isClickInsidePicker && !isClickOnTrigger && pickerContainer.classList.contains('active')) {
            closeDateTimePicker();
        }
    });

    // --- Logika Kalender (SANGAT DASAR & BELUM LENGKAP) ---
    // Ini hanya untuk demo struktur, bukan kalender fungsional penuh
    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

    function renderCalendar() {
        if (!currentMonthYearDisplay || !datepickerGrid) return;

        currentMonthYearDisplay.textContent = `${monthNames[currentDisplayedDate.getMonth()]} ${currentDisplayedDate.getFullYear()}`;
        datepickerGrid.innerHTML = ''; // Kosongkan grid lama

        const year = currentDisplayedDate.getFullYear();
        const month = currentDisplayedDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sunday, 1=Monday..
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Offset untuk hari Senin sebagai awal minggu (jika getDay() 0 (Minggu), jadi 6, selain itu -1)
        let dayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        // Sel kosong sebelum tanggal pertama
        for (let i = 0; i < dayOffset; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('date-cell', 'out-of-month', 'disabled-empty'); // disabled-empty untuk styling
            datepickerGrid.appendChild(emptyCell);
        }

        // Sel tanggal
        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement('div');
            dateCell.classList.add('date-cell');
            dateCell.textContent = day;

            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dateCell.classList.add('current-day');
            }
            // Cek apakah tanggal ini adalah tanggal yang "selected" dari state aplikasi (jika ada)
            // dateCell.classList.add('selected');

            dateCell.addEventListener('click', () => {
                datepickerGrid.querySelectorAll('.date-cell.selected').forEach(s => s.classList.remove('selected'));
                dateCell.classList.add('selected');
                // Update nilai tanggal terpilih ke input atau state
                console.log(`Selected: ${day} ${monthNames[month]} ${year}`);
            });
            datepickerGrid.appendChild(dateCell);
        }
    }

    // Navigasi bulan (contoh sangat dasar)
    pickerContainer?.querySelector('.prev-month')?.addEventListener('click', () => {
        currentDisplayedDate.setMonth(currentDisplayedDate.getMonth() - 1);
        renderCalendar();
    });
    pickerContainer?.querySelector('.next-month')?.addEventListener('click', () => {
        currentDisplayedDate.setMonth(currentDisplayedDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Initial render jika picker langsung aktif (misalnya untuk debugging)
    // if (pickerContainer?.classList.contains('active')) {
    //     renderCalendar();
    // }


    // Logika Time Adjusment (Contoh Dasar)
    pickerContainer?.querySelectorAll('.time-adj-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('.time-input');
            let currentValue = parseInt(input.value);
            const isHour = input.parentElement.parentElement.querySelector('.time-segment:nth-child(1) .time-input') === input; // Cek apakah ini input jam
            const maxVal = isHour ? 23 : 59; // Max jam 23, menit 59

            if (btn.classList.contains('up-arrow')) {
                currentValue = (currentValue >= maxVal && isHour) ? 0 : (currentValue >= maxVal && !isHour) ? 0 : currentValue + 1;
            } else { // down-arrow
                currentValue = (currentValue <= 0 && isHour) ? maxVal : (currentValue <= 0 && !isHour) ? maxVal : currentValue - 1;
            }
            input.value = currentValue.toString().padStart(2, '0');
        });
    });

    // Logika AM/PM Toggle
    pickerContainer?.querySelectorAll('.ampm-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            pickerContainer.querySelectorAll('.ampm-toggle').forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');
            // Logika update AM/PM
        });
    });

}); // Akhir DOMContentLoaded