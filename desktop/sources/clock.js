function Clock()
{
  this.show_pulse = false;

  this.toggle_pulse = function()
  {
    this.show_pulse = this.show_pulse ? false : true;
  }

  this.time = function()
  {
    var d = new Date(), e = new Date(d);
    var msSinceMidnight = e - d.setHours(0,0,0,0);
    var val = msSinceMidnight / 8640 / 10000;
    var format = val.toFixed(6).substr(2,6);
    return format;
  }

  this.format = function()
  {
    var t        = this.time();
    var t_s      = new String(t);
    return {beat:t_s.substr(0,(t_s.length-3)),pulse:t_s.substr(-3)};
  }

  this.toString = function()
  {
    return `${this.format().beat}:${this.format().pulse}`
  }

  this.menu = function(app)
  {
    return {label: 'Show Pulse', type: 'checkbox', checked: this.show_pulse, click:() => { this.toggle_pulse(); app.update_menu(); } };
  }
}

module.exports = new Clock();