$(function () {

    "use strict";

    var wind = $(window);



    // scrollIt
    $.scrollIt({
        upKey: 38,                // key code to navigate to the next section
        downKey: 40,              // key code to navigate to the previous section
        easing: 'swing',          // the easing function for animation
        scrollTime: 600,          // how long (in ms) the animation takes
        activeClass: 'active',    // class given to the active nav element
        onPageChange: null,       // function(pageIndex) that is called when page is changed
        topOffset: -80            // offste (in px) for fixed top navigation
    });



    // navbar scrolling background
    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img"),
            logoDark = $(".navbar-dark .logo> img");

        if (bodyScroll > 100) {

            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');
            logoDark.attr('src', 'img/logo-light.png');

        } else {

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
            logoDark.attr('src', 'img/logo-light.png');
        }
    });


    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });



    // progress bar
    wind.on('scroll', function () {
        $(".progress-item span").each(function () {
            var bottom_of_object =
                $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
                $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: myVal
                });
            }
        });
    });



    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });



    // === owl-carousel === //

    // Hero owlCarousel
    $('.carousel-single .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        mouseDrag: false,
        autoplay: false,
        smartSpeed: 500
    });



    // magnificPopup
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });


    // countUp
    $('.numbers .numb').countUp({
        delay: 1,
        time: 1500
    });


});


// === window When Loading === //

$(window).on("load", function () {

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);


    // stellar
    wind.stellar();


    // isotope
    var $gallery = $('.gallery').isotope({
        itemSelector: '.items',
        filter: '.high'
    });

    $gallery.addClass('is-loaded');

    // filter items on button click
    $('.filtering').on('click', 'span', function () {
        var filterValue = $(this).attr('data-filter');
        $gallery.isotope({
            filter: filterValue
        });

        $(this).addClass('active').siblings().removeClass('active');
    });


    // contact form validator
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});

// calculate age and experience
function calculateAge(birthDateString) {
    const [day, month, year] = birthDateString.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

function calculateExperience(joinDateString) {
    const [day, month, year] = joinDateString.split('-').map(Number);
    const joinDate = new Date(year, month - 1, day);
    const today = new Date();

    let experience = today.getFullYear() - joinDate.getFullYear();
    const monthDiff = today.getMonth() - joinDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < joinDate.getDate())
    ) {
        experience--;
    }

    return experience;
}

document.getElementById('age').textContent = calculateAge('01-01-1972');
document.getElementById('experience').textContent = calculateExperience('01-01-1998');

// change quotes randomly
const quotes = [
    {
        type: "quran",
        text: `
            <div class="quote-arabic" dir="rtl" lang="ar">
                <q>لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا</q>
            </div>
            <div class="quote-english mt-2">
                <q>Allah does not burden a soul beyond that it can bear.</q>
            </div>
        `,
        author: "Surah Al-Baqarah",
        cite: "2:286"
    },
    {
        type: "person",
        text: `
            <div class="quote-english mt-2">
                <q>Do not go gentle into that good night. Rage, rage against the dying of the light.</q>
            </div>
        `,
        author: "Dylan Thomas",
        cite: "1914–1953"
    },
    {
        type: "bangla",
        text: `
            <div class="quote-bangla">
                <q>অসাধারণ ঝুঁকি নেওয়ার ইচ্ছা না থাকলে তোমাকে সাধারণ জীবনযাপন করতে হবে।</q>
            </div>
        `,
        author: "জিম রন",
        cite: ""
    },
    {
        type: "bangla-islamic",
        text: `
        <div class="quote-bangla">
            <q>পাঁচটি অবস্থাকে পাঁচটি অবস্থার পূর্বে গুরুত্ব দাওঃ বার্ধক্য হওয়ার আগে যৌবনের সময়কে; অসুস্থ হওয়ার আগে সুস্থতাকে; দারিদ্রতার আগে স্বচ্ছলতাকে; ব্যস্ত হয়ে যাওয়ার আগে অবসরকে; মৃত্যুর আগে তোমার জীবনকে।</q>
        </div>
    `,
        author: "রাসূলুল্লাহ (সাঃ)",
        cite: "সহিহ হাদিস"
    },

    {
        type: "bangla-islamic",
        text: `
        <div class="quote-bangla">
            <q>গীবত খুনের চেয়েও মারাত্মক। খুন পরিশোধ করা যায়, কিন্তু গীবত পরিশোধ করা যায় না। বিচারের মাঠে যার গীবত করেছেন তাকে আপনার নেকি দিয়ে ঋণ পরিশোধ করতে হবে।</q>
        </div>
    `,
        author: "তিরমিজি",
        cite: "হাদিস: ২৪১৮"
    },
    {
        type: "bangla-person",
        text: `
        <div class="quote-bangla">
            <q>রাজনীতিতে অনীহা তখনই আসে, যখন নিজের চেয়ে নিকৃষ্টতম কারো দ্বারা পরিচালিত হতে হয়।</q>
        </div>
    `,
        author: "প্লেটো",
        cite: ""
    },
    {
        type: "bangla-islamic",
        text: `
        <div class="quote-bangla">
            <q>মানুষের উপর এমন এক যুগ অবশ্যই আসবে, যখন মানুষ পরোয়া করবে না, সে কিভাবে সম্পদ উপার্জন করেছে — হালাল না হারাম উপায়ে।</q>
        </div>
    `,
        author: "রাসূলুল্লাহ (সাঃ)",
        cite: ""
    },
    {
        type: "quran-bn",
        text: `
        <div class="quote-bangla">
            <q>তোমাদের আগেও বহু মানবগোষ্ঠীকে আমি ধ্বংস করে দিয়েছি, যখন তারা সীমা অতিক্রম করেছিল।</q>
        </div>
    `,
        author: "সুরা ইউনুস",
        cite: "আয়াত: ১৩"
    },

    {
        type: "quran",
        text: `
            <div class="quote-arabic" dir="rtl" lang="ar">
                <q>فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا</q>
            </div>
            <div class="quote-english mt-2">
                <q>For indeed, with hardship comes ease. Indeed, with hardship comes ease.</q>
            </div>
        `,
        author: "Surah Ash-Sharh",
        cite: "94:5-6"
    },
    {
        type: "person",
        text: `
            <div class="quote-english mt-2">
                <q>The only way to do great work is to love what you do.</q>
            </div>
        `,
        author: "Steve Jobs",
        cite: "2005"
    },
    {
        type: "quran",
        text: `
            <div class="quote-arabic" dir="rtl" lang="ar">
                <q>أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ</q>
            </div>
            <div class="quote-english mt-2">
                <q>Verily, in the remembrance of Allah do hearts find rest.</q>
            </div>
        `,
        author: "Surah Ar-Ra'd",
        cite: "13:28"
    },
    {
        type: "person",
        text: `
            <div class="quote-english mt-2">
                <q>In the middle of difficulty lies opportunity.</q>
            </div>
        `,
        author: "Albert Einstein",
        cite: "1879–1955"
    },
    {
        type: "quran",
        text: `
            <div class="quote-arabic" dir="rtl" lang="ar">
                <q>وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ</q>
            </div>
            <div class="quote-english mt-2">
                <q>And He is with you wherever you are.</q>
            </div>
        `,
        author: "Surah Al-Hadid",
        cite: "57:4"
    },
    {
        type: "person",
        text: `
            <div class="quote-english mt-2">
                <q>Be yourself; everyone else is already taken.</q>
            </div>
        `,
        author: "Oscar Wilde",
        cite: "1854–1900"
    },
    {
        type: "quran",
        text: `
            <div class="quote-arabic" dir="rtl" lang="ar">
                <q>قُلْ يَٰعِبَادِيَ ٱلَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ ٱللَّهِ</q>
            </div>
            <div class="quote-english mt-2">
                <q>Say, O My servants who have transgressed against themselves, do not despair of the mercy of Allah.</q>
            </div>
        `,
        author: "Surah Az-Zumar",
        cite: "39:53"
    },
    {
        type: "person",
        text: `
            <div class="quote-english mt-2">
                <q>Success is not final, failure is not fatal: it is the courage to continue that counts.</q>
            </div>
        `,
        author: "Winston Churchill",
        cite: "1874–1965"
    }
];

let currentQuoteIndex = -1;

function changequote() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === currentQuoteIndex && quotes.length > 1);

    currentQuoteIndex = randomIndex;

    document.getElementById("bqhead").innerHTML = quotes[currentQuoteIndex].text;

    document.getElementById("bqfoot").innerHTML =
        quotes[currentQuoteIndex].cite
            ? `${quotes[currentQuoteIndex].author} <cite title="${quotes[currentQuoteIndex].author}">${quotes[currentQuoteIndex].cite}</cite>`
            : `${quotes[currentQuoteIndex].author}`;
}

changequote();
setInterval(changequote, 7000);

// contact me
function showToast(message, type = "success") {
    const background = type === "success"
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, #ff5f6d, #ffc371)";

    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: background
        }
    }).showToast();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateContactForm() {
    const name = document.getElementById("form_name").value.trim();
    const email = document.getElementById("form_email").value.trim();
    const subject = document.getElementById("form_subject").value.trim();
    const message = document.getElementById("form_message").value.trim();

    if (!name) {
        showToast("Name is required.", "error");
        return false;
    }

    if (!email) {
        showToast("Email is required.", "error");
        return false;
    }

    if (!isValidEmail(email)) {
        showToast("Please enter a valid email address.", "error");
        return false;
    }

    if (!subject) {
        showToast("Subject is required.", "error");
        return false;
    }

    if (!message) {
        showToast("Message is required.", "error");
        return false;
    }

   
    return true;
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const isValid = validateContactForm();

    if (isValid) {
        // Later you can add your API call here
        showToast("Your message is successfully sent.", "success");
        this.reset();
    }
});