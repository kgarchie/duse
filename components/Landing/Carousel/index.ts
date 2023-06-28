import {defineComponent, h, PropType, ref} from "vue";
import {LandingCarouselCard} from "#components";
import '~/assets/css/carousel.css'
import {ca} from "date-fns/locale";

export default defineComponent({
    name: "Carousel",
    props: {
        CarouselItems: {
            type: Array as PropType<{
                imageUrl: string,
                caption: string
            }[]>,
            default: () => [
                {
                    imageUrl: '/static/images/model1.jpg',
                    caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, asperiores.'
                },
                {
                    imageUrl: '/static/images/model2.jpg',
                    caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, asperiores.'
                },
                {
                    imageUrl: '/static/images/model3.jpg',
                    caption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, asperiores.'
                }
            ]
        }
    },
    setup(props) {
        const carouselTrack = ref<HTMLElement | null>(null);
        const popUpCarousel = ref<HTMLElement | null>(null);

        const slides = ref()
        const activeIndex = ref<number | null>(null);
        const slideWidth = ref(0)

        let directionForward: boolean = true;
        let autoSlideIntervalPointer: any = null;

        const recursionLimit = 500;

        function pauseCarousel() {
            clearInterval(autoSlideIntervalPointer);
            autoSlideIntervalPointer = null;
        }

        function moveCarousel(directionForward: boolean) {
            const nextSlideIndex = directionForward ? activeIndex.value! + 1 : activeIndex.value! - 1;
            if (nextSlideIndex < 0 || nextSlideIndex >= slides.value.length) return

            slides.value[activeIndex.value!].classList.remove('current-slide');
            carouselTrack.value!.style.transform = 'translateX(-' + ((slideWidth.value * nextSlideIndex) + (slideWidth.value / 2)) + 'px)';
            slides.value[nextSlideIndex].classList.add('current-slide');

            activeIndex.value = nextSlideIndex;

        }

        function moveCarouselBackward() {
            directionForward = false;
            pauseCarousel();
            moveCarousel(directionForward);
        }

        function moveCarouselForward() {
            directionForward = true;
            pauseCarousel();
            moveCarousel(directionForward);
        }

        let configCount = 0;
        function configureCarousel() {
            slides.value = Array.from(carouselTrack.value!.children) as HTMLElement[] || [];
            slideWidth.value = slides.value[0]?.clientWidth || 0;

            activeIndex.value = activeIndex.value ? activeIndex.value : Math.floor(slides.value.length / 2);

            carouselTrack.value!.style.transform = 'translateX(-' + ((slideWidth.value * activeIndex.value) + (slideWidth.value / 2)) + 'px)';
            slides.value[activeIndex.value].classList.add('current-slide');
            carouselTrack.value!.style.visibility = 'visible';

            if (slideWidth.value !== 0) return
            if (configCount >= recursionLimit) return
            configCount++;
            setTimeout(() => {
                configureCarousel();
            }, 10)
        }

        function autoMoveCarousel() {
            if (activeIndex.value! >= slides.value.length - 1) {
                directionForward = false;
            } else if (activeIndex.value === 0) {
                directionForward = true;
            }
            moveCarousel(directionForward);
        }

        function startCarousel() {
            configureCarousel();
            autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);

            const slideDetails = document?.querySelectorAll('.carousel__slide-details') as NodeListOf<HTMLElement> || null;

            slideDetails?.forEach((slideDetail) => {
                slideDetail.addEventListener('mouseenter', () => {
                    pauseCarousel();
                })
                slideDetail.addEventListener('mouseleave', () => {
                    if (autoSlideIntervalPointer) return;
                    autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);
                })
            })

            window.addEventListener('resize', () => {
                configureCarousel();
            })

            popUpCarousel.value!.addEventListener('mouseleave', () => {
                if (autoSlideIntervalPointer) return;
                autoSlideIntervalPointer = setInterval(autoMoveCarousel, 3000);
            })

            let smoothCount = 0;
            function addSmoothTransition() {
                // console.log(slideWidth.value)
                setTimeout(() => {
                    if (slideWidth.value !== 0) {
                        if (carouselTrack.value!.classList.contains('transitionSpeed')) return
                        carouselTrack.value!.classList.add('transitionSpeed')
                    } else {
                        if (carouselTrack.value!.classList.contains('transitionSpeed')) carouselTrack.value!.classList.remove('transitionSpeed')
                        if (smoothCount >= recursionLimit) return
                        smoothCount++;
                        setTimeout(() => {
                            // console.log('transitionSpeed')
                            addSmoothTransition();
                        }, 10)
                    }
                }, 0)
            }

            addSmoothTransition();
        }

        return {
            moveCarouselBackward,
            moveCarouselForward,
            startCarousel,
            configureCarousel,
            pauseCarousel,
            CarouselItems: props.CarouselItems,
            carouselTrack,
            popUpCarousel
        }
    },
    mounted() {
        setTimeout(() => {
            this.carouselTrack = this.$refs.carouselTrack as HTMLElement;
            this.popUpCarousel = this.$refs.popUpCarousel as HTMLElement;
            this.startCarousel();
        }, 0)
    },
    unmounted() {
        this.pauseCarousel();
        window.removeEventListener('resize', () => {
            this.configureCarousel();
        })
    },
    render() {
        return h('section', {class: 'pop-up-carousel', ref: 'popUpCarousel'}, [
            h('span', {class: 'carousel__button carousel__button--left', onClick: this.moveCarouselBackward}, [
                h('img', {src: "/static/images/vectors/right-arrow-img.svg", alt: "", width: "25", height: "25"})
            ]),
            h('div', {class: 'carousel__track-container'}, [
                h('div', {class: 'carousel-track', style: {visibility: 'hidden'}, ref: 'carouselTrack'}, [
                    this.CarouselItems?.map(
                        (item, index) => h(LandingCarouselCard, {
                            imageUrl: item.imageUrl,
                            caption: item.caption,
                        })
                    )
                ])
            ]),
            h('span', {class: 'carousel__button carousel__button--right', onClick: this.moveCarouselForward}, [
                h('img', {src: "/static/images/vectors/right-arrow-img.svg", alt: "", width: "25", height: "25"})
            ])
        ]);
    }
});
