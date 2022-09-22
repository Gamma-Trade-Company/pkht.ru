export default function toggleSlide(body, collapse, duration) {
    const timeStart = performance.now();
    body.style.display = 'block';
    const height = collapse ? body.offsetHeight : 0;
    const to = collapse ? -height : body.offsetHeight;
    body.style.height = '0px';
    body.style.overflow = 'hidden';
    body.style.marginTop = '0px';
    body.style.marginBottom = '0px';
    body.style.paddingTop = '0px';
    body.style.paddingBottom = '0px';

    function animate(time) {
        let fraction = (time - timeStart) / duration;
        if (fraction > 1) fraction = 1;
        body.style.height = `${height + to * fraction}px`;
        if (fraction < 1) requestAnimationFrame(animate);
        else {
            if (collapse) {
                body.style = '';
                body.style.display = 'none';
            } else {
                body.style = '';
                body.style.display = 'block';
            }
        }
    }

    requestAnimationFrame(animate);
}