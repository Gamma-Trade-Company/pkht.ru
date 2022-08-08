export default function scrollAnimate(scrollableElem, to, duration) {
    const elem = scrollableElem === window ||
               scrollableElem === document.documentElement ||
               scrollableElem === document.body
               ? window : scrollableElem;
    const scrollTop = elem === window ? elem.pageYOffset : elem.scrollTop;
    if (scrollTop === to) return;
    const timeStart = performance.now();
    
    to = -(scrollTop - to);
    elem.scroll = function(distance){
        if (this === window) return this.scrollTo(0, distance);
        return this.scrollTop = distance;
    };
    const animation = time => {
        let fraction = (time - timeStart) / duration;
        if (fraction > 1) fraction = 1;
        const distance = scrollTop + to * fraction;
        elem.scroll(distance);

        if (fraction < 1) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
    
}
