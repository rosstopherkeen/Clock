function Entaloneralie()
{
  this.clock = new Clock();
  this.calendar = new Calendar();

  this.el = document.createElement("canvas"); 
  this.size = {width:window.innerWidth,height:window.innerHeight,ratio:2};
  this.el.id = "ental";
  this.el.width = this.size.width * this.size.ratio;
  this.el.height = this.size.height * this.size.ratio;

  this.start = function()
  {
    document.body.appendChild(this.el);
    setInterval(() => { this.update(); },17);
  }

  this.context = function()
  {
    return this.el.getContext('2d');
  }

  this.clear = function()
  {
    var ctx = this.context();

    ctx.clearRect(0, 0, this.size.width * this.size.ratio, this.size.height * this.size.ratio);
  }

  this.draw_digits = function()
  {
    var t        = this.clock.time();
    var t_s      = new String(t);
    var w        = this.size.width * this.size.ratio;
    var h        = this.size.height * this.size.ratio;
    var pad      = 120;
    var needle_1 = parseInt(((t/1000000) % 1) * (h - (pad*2))) + pad;
    var needle_2 = parseInt(((t/100000) % 1) * (w - (pad*2))) + pad;
    var needle_3 = needle_1 + parseInt(((t/10000) % 1) * (h - pad - needle_1));

    var font_size    = 40;
    var ctx          = this.context();
    ctx.font         = `${font_size}px input_mono_regular`;
    ctx.fillStyle    = 'white';
    ctx.textBaseline = 'top';
    ctx.textAlign    = "right"; 
    ctx.fillText(t_s.substr(0,1), pad*0.75, needle_1-(font_size/2));
    ctx.textAlign    = "center"; 
    ctx.fillText(t_s.substr(1,1), needle_2, (pad/2)-(font_size/2));
    ctx.textAlign    = "left"; 
    ctx.fillText(t_s.substr(2,1), w-(pad*0.75), needle_3-(font_size/2));
    ctx.textAlign    = "center"; 
    ctx.fillText(`${this.calendar} ${this.clock}`, w/2, h-(pad*0.75));

    ctx.textAlign    = "left"; 
    ctx.fillText(`${w} x ${h}`, 100,100);
  }

  this.draw_path = function()
  {
    var w = this.size.width;
    var h = this.size.height;

    var ctx = this.context();
    var p = new Path2D(this.path());
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3.5;
    ctx.stroke(p);
  }

  this.path = function()
  {
    var t        = this.clock.time();
    var t_s      = new String(t);
    var w        = this.size.width * this.size.ratio;
    var h        = this.size.height * this.size.ratio;
    var pad      = 120;
    var needle_1 = parseInt(((t/1000000) % 1) * (h - (pad*2))) + pad;
    var needle_2 = parseInt(((t/100000) % 1) * (w - (pad*2))) + pad;
    var needle_3 = needle_1 + parseInt(((t/10000) % 1) * (h - pad - needle_1));
    var needle_4 = needle_2 + parseInt(((t/1000) % 1) * (w - pad - needle_2));
    var needle_5 = needle_3 + parseInt(((t/100) % 1) * (h - pad - needle_3));
    var needle_6 = needle_4 + parseInt(((t/10) % 1) * (w - pad - needle_4));
    var path = `M${pad},${needle_1} L${w-pad},${needle_1} M${needle_2},${needle_1} L${needle_2},${h-pad} M${needle_2},${needle_3} L${w-pad},${needle_3} M${needle_4},${needle_3} L${needle_4},${h-pad} M${needle_4},${needle_5} L${w-pad},${needle_5} M${needle_6},${needle_5} L${needle_6},${h-pad} `;
    return `${path} M${pad},${pad} L${w-pad},${pad} L${w-pad},${h-pad} L${pad},${h-pad} Z`;
  }

  this.update = function()
  {
    this.clear();
    this.draw_path();
    this.draw_digits();
  }
}