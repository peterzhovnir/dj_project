

const createEq = function (audioElement, cnv, canvasWrapper) {
    const ctx = cnv.getContext('2d');

    let sudioSource;
    let context;
    let analyser;

    let initialized;
 
    return () => {
        if (!initialized) {
            context = new AudioContext();
            analyser = context.createAnalyser();
            sudioSource = context.createMediaElementSource(audioElement);

            // audioSrc.load();
            // audioSrc.play();

            sudioSource.connect(analyser);
            analyser.connect(context.destination);

            analyser.fftSize = 256;
            initialized = true;
        }

        let bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);
    
        let dataArray = new Uint8Array(bufferLength);



        function init() {
            cnv.width = canvasWrapper.clientWidth;
            cnv.height = canvasWrapper.clientHeight;
        }
        init();


        const numberOfRings = 2;
        const ringRadiusOffset = 40;
        const ringRadius =200;


        // var barWidth = (WIDTH / bufferLength) * 2.5;
        var x = 0;


        let centerX = cnv.width /2;
        let centerY = cnv.height /2;
        
        function upadteRings(){
            analyser.getByteFrequencyData(dataArray);


            // let radius = i * ringRadiusOffset + ringRadius;
            for (var i = 0; i < bufferLength; i++) {
            // console.log(dataArray[i]);
            let radius_in = ringRadius;
            let radius_out = (dataArray[i]/3)  + ringRadius;
            // drawRing(radius);
            drawLines(radius_in, radius_out,i);
            }
                
        }

        function drawLines(radius_in, radius_out,j) {
                
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 4;
                // let sideSwitch =true;
                const graphSize = 150;
                let leftAngle = graphSize;
                let righttAngle = -graphSize;


                    redredSides(radius_in, radius_out,j,leftAngle);
                    redredSides(radius_in, radius_out,j,righttAngle);
                

                // j> 0? ctx.lineTo(x,y) : ctx.moveTo(x,y);
                            
            
        }

        function redredSides (radius_in, radius_out,j,sizeAngle) {
            let currentAngle = (Math.PI) + j * Math.PI/sizeAngle;
            let x_in = centerX + Math.cos(currentAngle) * radius_in;
            let y_in = centerY + Math.sin(currentAngle) * radius_in;

            let x_out = centerX + Math.cos(currentAngle) * radius_out;
            let y_out = centerY + Math.sin(currentAngle) * radius_out;

            ctx.beginPath();

            ctx.moveTo(x_in,y_in);
            ctx.lineTo(x_out,y_out);
            ctx.stroke();
            
            // sideSwitch = !sideSwitch;
        };



    //OLD


        // function init() {
        //     cnv.width = innerWidth;
        //     cnv.height = innerHeight;
        // }

        
        // init();


        // const numberOfRings = 2;
        // const ringRadiusOffset = 40;
        // const ringRadius =200;


        // let centerX = cnv.width /2;
        // let centerY = cnv.height /2;
        
        // function upadteRings(){
        //     for (let i = 0; i < numberOfRings; i++) {
        //         let radius = i * ringRadiusOffset + ringRadius;

        //         let radius_in = ringRadius;
        //         let radius_out = ringRadiusOffset + ringRadius;
        //         // drawRing(radius);
        //         drawLines(radius_in, radius_out)
                
        //     }
        // }

        // function drawLines(radius_in, radius_out) {
        //     for (let j = 0; j < 360; j++) {
                
        //         ctx.strokeStyle = 'red';
        //         ctx.lineWidth = 1;
                
        //         let currentAngle = j * Math.PI/180;
        //         let x_in = centerX + Math.cos(currentAngle) * radius_in;
        //         let y_in = centerY + Math.sin(currentAngle) * radius_in;

        //         let x_out = centerX + Math.cos(currentAngle) * radius_out;
        //         let y_out = centerY + Math.sin(currentAngle) * radius_out;

        //         ctx.beginPath();

        //         ctx.moveTo(x_in,y_in);
        //         ctx.lineTo(x_out,y_out);
        //         ctx.stroke();

        //         // j> 0? ctx.lineTo(x,y) : ctx.moveTo(x,y);
                            
        //     }
        // }

    //OLD END

        // function drawRing(radius) {
        //     ctx.strokeStyle = 'red';
        //     ctx.lineWidth = 15;

        //     ctx.beginPath();
        //     // ctx.moveTo(centerX + 200, centerY);

        //     for (let j = 0; j < 360; j++) {
        
        //         let currentAngle = j * Math.PI / 180;
        //         let x = centerX + Math.cos(currentAngle) * radius;
        //         let y = centerY + Math.sin(currentAngle) * radius;

        //         j> 0? ctx.lineTo(x,y) : ctx.moveTo(x,y);
                            
        //     }


        //     // ctx.lineTo(300,400);
        //     ctx.closePath();
        //     ctx.stroke();

            
        // }



        function loop(){
            ctx.clearRect(0,0, cnv.width, cnv.height);
            upadteRings();
            requestAnimationFrame(loop);
        }
        loop();
        window.addEventListener('resize', init);
    }
};
