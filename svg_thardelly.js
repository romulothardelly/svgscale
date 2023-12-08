



/**
 * Add click and drag events to a svg element
 * @param {SVGAElement} svg 
 */
function SVGaddEvents(svg) {

    svg.setAttribute("clicado", "false")
    svg.setAttribute("xpas", "0")
    svg.setAttribute("ypas", "0")
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
    svg.setAttribute("viewBox", "0 0 100 100")
    svg.setAttribute("width", "400px")
    svg.setAttribute("height", "400px")
    svg.setAttribute("style", "border:1px solid black")
    svg.setAttribute("transform", "scale(1,-1)")

    svg.addEventListener("mouseup", function(event) {
        this.setAttribute("clicado","false")

    })

    svg.addEventListener("mousedown", function(event) {
        this.setAttribute("clicado","true")
        const pos=this.svgGetXY(event,this) 
        this.setAttribute("xpas",pos[0])
        this.setAttribute("ypas",pos[1])

    })

    svg.addEventListener("wheel", function(event) {
        event.preventDefault();
        const scale=(event.deltaY>0)?1.1:0.9;
        const viewBox = this.getAttribute('viewBox').split(' ');

        const w=viewBox[2]*scale
        const dw=w-viewBox[2]
        const h=viewBox[3]*scale
        const dh=h-viewBox[3]
        const newviewbox=[viewBox[0]*1-dw/2,viewBox[1]*1-dh/2,w,h]
        this.setAttribute('viewBox', newviewbox.join(' '));

    })

   
    
    svg.addEventListener("dblclick",function(event){
        if(this.getAttribute("preserveAspectRatio")=="none"){
            this.setAttribute("preserveAspectRatio", "xMidYMid meet")
            alert("Preserve aspect ratio")}
        else{             
            this.setAttribute("preserveAspectRatio", "none")
            alert("No preserve aspect ratio")
        }            

    })

    svg.addEventListener("mousemove", function (event) {
        
        

        event.stopPropagation()
        if (this.getAttribute("clicado") == "true") {
            pos = this.svgGetXY(event, this)
 
            const xpas=this.getAttribute("xpas")
            const ypas=this.getAttribute("ypas")
            const dx=pos[0]-xpas
            const dy=pos[1]-ypas
            const viewBox = this.getAttribute('viewBox').split(' ');
            const newviewbox=[viewBox[0]*1-dx,viewBox[1]*1-dy,viewBox[2]*1,viewBox[3]*1]
        
            this.setAttribute('viewBox', newviewbox.join(' '));
           
        }
    })
    /**
 * Create a line element in a svg element
 * @param {SVGAElement} svg 
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 * @param {string} color 
 */
    svg.addLine=function( x1, y1, x2, y2, color = "black") {
        const linha=document.createElementNS("http://www.w3.org/2000/svg", "line");
        linha.setAttribute("x1",x1)
        linha.setAttribute("y1",y1)
        linha.setAttribute("x2",x2)
        linha.setAttribute("y2",y2)
        linha.setAttribute("stroke",color)
        linha.setAttribute("stroke-width","0.5")
        svg.appendChild(linha)
    }




    /**
 * Function that get the x and y position of the mouse in a svg element viewbox
 * @param {Event} event 
 * @param {SVGAElement} svg 
 * @returns 
 */
svg.svgGetXY=function(event) {
    const w=this.width.baseVal.value;
    const h=this.height.baseVal.value;          
    const mousex = event.clientX - this.getBoundingClientRect().left;
   // const dx = (mousex - w/2)/scale;
    const mousey = h-(event.clientY - this.getBoundingClientRect().top);
    //  const dy = (mousey - h/2)/scale;    

    const viewBox = this.getAttribute('viewBox').split(' ');
     

    if (this.getAttribute("preserveAspectRatio")=="none"){
        
        const xpos = (mousex-w/2)/(w/viewBox[2])+viewBox[0]*1+viewBox[2]/2;
        const ypos = (mousey-h/2)/(h/viewBox[3])+viewBox[1]*1+viewBox[3]/2;
        return [xpos,ypos]
    }else{
        const scale=(viewBox[2]>=viewBox[3])?h/viewBox[3]:w/viewBox[2];
        const xpos = (mousex-w/2)/scale+viewBox[0]*1+viewBox[2]/2;
        const ypos = (mousey-h/2)/scale+viewBox[1]*1+viewBox[3]/2;
        return [xpos,ypos]
    }

}


}


document.querySelectorAll('.svgThardelly').forEach(svgs => {
    SVGaddEvents(svgs)
});

