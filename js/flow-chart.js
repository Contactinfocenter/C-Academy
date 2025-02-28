function drawArrow(svg, startElement, endElement) {
    const svgNS = "http://www.w3.org/2000/svg";
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const containerRect = svg.parentElement.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2 - containerRect.left;
    const startY = startRect.top - containerRect.top;
    const endX = endRect.left + endRect.width / 2 - containerRect.left;
    const endY = endRect.bottom - containerRect.top;

    // Create the path
    const arrowPath = `
        M ${startX} ${startY}
        L ${endX} ${endY}
    `;

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", arrowPath);
    path.setAttribute("class", "arrow");

    // Add arrowhead
    const arrowHead = document.createElementNS(svgNS, "polygon");
    const arrowHeadSize = 10; // Size of the arrowhead
    const angle = Math.atan2(endY - startY, endX - startX);
    const arrowHeadPoints = [
        endX, endY,
        endX - arrowHeadSize * Math.cos(angle - Math.PI / 6), endY - arrowHeadSize * Math.sin(angle - Math.PI / 6),
        endX - arrowHeadSize * Math.cos(angle + Math.PI / 6), endY - arrowHeadSize * Math.sin(angle + Math.PI / 6)
    ].join(' ');

    arrowHead.setAttribute("points", arrowHeadPoints);
    arrowHead.setAttribute("class", "arrow-head");

    svg.appendChild(path);
    svg.appendChild(arrowHead);
}

window.onload = () => {
    const svg = document.getElementById("arrows");

    const hotline = document.getElementById("hotline");
    const email = document.getElementById("email");
    const sms = document.getElementById("sms");
    const vivr = document.getElementById("vivr");
    const whatsapp = document.getElementById("whatsapp");
    const facebook = document.getElementById("facebook");
    const selfCare = document.getElementById("self-care");
    const liveChat = document.getElementById("live-chat");

    const ticket = document.getElementById("ticket");
    const solved = document.getElementById("solved");
    const unresolved = document.getElementById("unresolved");

    const transmission = document.getElementById("transmission");
    const sde = document.getElementById("sde");
    const linkShift = document.getElementById("link-shift");
    const lanSupport = document.getElementById("lan-support");
    const core = document.getElementById("core");
    const billing = document.getElementById("billing");
    const solved2 = document.getElementById("solved-2");
    const closed = document.getElementById("closed");

    // Arrows from contact options to ticket
    [hotline, email, sms, vivr, whatsapp, facebook, selfCare, liveChat].forEach(option => {
        drawQuarterArrow(svg, option, ticket);
    });

    // Arrows from ticket to solved and unresolved
    drawQuarterArrow(svg, ticket, solved);
    drawQuarterArrow(svg, ticket, unresolved);

    // Arrows from unresolved to other departments and solved2
    [transmission, sde, linkShift, lanSupport, core, billing].forEach(dept => {
        drawQuarterArrow(svg, unresolved, dept);
        drawQuarterArrow(svg, dept, solved2); // Added connection to solved2
    });   

    // Arrow from contact center's solved to status closed
    drawQuarterArrow(svg, solved, closed);

    // Arrow from other-dept's solved2 to status closed
    drawArrow(svg, solved2, closed);
};

function drawQuarterArrow(svg, startElement, endElement) {
    const svgNS = "http://www.w3.org/2000/svg";
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const containerRect = svg.parentElement.getBoundingClientRect();

    const startX = startRect.right - containerRect.left;
    const startY = startRect.top + startRect.height / 2 - containerRect.top;
    const endX = endRect.left - containerRect.left;
    const endY = endRect.top + endRect.height / 2 - containerRect.top;

    // Define intermediate points for the L-shaped arrow
    const midX = startX + (endX - startX) / 2;

    // Create the path
    const arrowPath = `
        M ${startX} ${startY}
        L ${midX} ${startY}
        L ${midX} ${endY}
        L ${endX} ${endY}
    `;

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", arrowPath);
    path.setAttribute("class", "arrow");

    // Add arrowhead
    const arrowHead = document.createElementNS(svgNS, "polygon");
    arrowHead.setAttribute("points", `${endX},${endY - 5} ${endX + 10},${endY} ${endX},${endY + 5}`);
    arrowHead.setAttribute("class", "arrow-head");

    svg.appendChild(path);
    svg.appendChild(arrowHead);
}       