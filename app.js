/*Muhammed Erdinç*/
var kareNesnesi;
var engelNesnesi = [];
var puan;
function startGame() {
    kareNesnesi = new bilesen(30,30,"red",10,120);
    puan = new bilesen("25px","consolas","black",0,25,"text");
    oyunAlani.start();
   
    }
    
    var oyunAlani = {
        canvas:document.createElement("canvas"),
        start:function(){ //Start () yöntemi bir <canvas> öğesi oluşturur ve onu <body> öğesinin ilk alt düğümü olarak ekler.
            this.canvas.width = 600;
            this.canvas.height = 400;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas,document.body.childNodes[0]); //Belirtilen child'ın önüne alt olarak bir düğüm ekledim.
            this.cerceveNo = 0;
            this.interval = setInterval(oyunAlaniniGuncelle,20); //setinterval fonksiyonu belirli milisaniyelerle fonksiyonu çağırmaya yarar.
            window.addEventListener('keydown',(e) =>{
                oyunAlani.keys = (oyunAlani.keys || []); // Yön hareketlerinde birden fazla tuşa basmak için.
                oyunAlani.keys[e.keyCode] = (e.type == "keydown") //Klavya tuşlarına bastığımız sürece true değeri dönecek.
              
            })
            window.addEventListener('keyup',(e) =>{
                oyunAlani.keys[e.keyCode] = (e.type == "keydown")//Klavye tuşlarına basmayı bıraktığımda false değeri dönecek.
            
            })
        },
        clear : function() {
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);//Dikdörtgen içerisindeki belirtilen pikselleri temizliyorum.
        },
        stop : () => {
            clearInterval(tdhis.interval);
        }
    }

    function herbirAralik(n){
        if((oyunAlani.cerceveNo/n) % 1 == 0) {return true;}
        return false;
    }
    //Canvas nesnesi üzerine kare componentimizi çizdik.
    function bilesen(width,height,color,x,y,type){
        this.type = type;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.guncelle = () => {
            ctx = oyunAlani.context;
            if(this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x,this.y);
            } else {
                ctx.fillStyle = color; //Çizimi doldurmak için kullanılan rengi ayarlıyoruz.
                ctx.fillRect(this.x,this.y,this.width,this.height); //Canvas nesnemizin üzerine dikdörtgen çiziyoruz.
    
            }
           
        }
        this.crashWith = function(otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }
        this.yeniPozisyon = () => {

            this.x += this.speedX;
            this.y += this.speedY;
           
        }
      
       
    }
   
    
    oyunAlaniniGuncelle = () =>{
        var x,y,height,gap,minHeight,maxHeight,minGap,maxGap;
        for(i=0; i<engelNesnesi.length; i+=1){
            if(kareNesnesi.crashWith(engelNesnesi[i])){
                oyunAlani.stop();
                return;
            }
        }
       
        oyunAlani.clear();
        oyunAlani.cerceveNo +=1;

        if(oyunAlani.cerceveNo ==1 || herbirAralik(50)){
            x = oyunAlani.canvas.width;
            minHeight = 25;
            maxHeight = 200;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            engelNesnesi.push(new bilesen(10,height,"green",x,0));
            engelNesnesi.push(new bilesen(10,x-height-gap,"green",x,height+gap));
        }

        for(i=0; i< engelNesnesi.length; i+=1) {
           engelNesnesi[i].speedX = -4;
           engelNesnesi[i].yeniPozisyon();
           engelNesnesi[i].guncelle();
          
          
        }
        puan.text = "Skor: " + oyunAlani.cerceveNo;
        puan.guncelle();
        kareNesnesi.guncelle();
        kareNesnesi.yeniPozisyon();
     
        if(oyunAlani.keys && (oyunAlani.keys[37] || oyunAlani.keys[65])) kareNesnesi.x -= 2; //Sola hareket
        if(oyunAlani.keys && (oyunAlani.keys[39] || oyunAlani.keys[68])) kareNesnesi.x += 2; //Sağa hareket
        if(oyunAlani.keys && (oyunAlani.keys[38] || oyunAlani.keys[87])) kareNesnesi.y -= 2; //Yukarı hareket
        if(oyunAlani.keys && (oyunAlani.keys[40] || oyunAlani.keys[83]))  kareNesnesi.y +=2; //Aşağı hareket
      
}




    

   
   