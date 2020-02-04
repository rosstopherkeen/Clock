function Desamber(str)
{
  this.str = str;
  this.year = parseInt(`20${str.substr(0,2)}`);

  this.toString = function()
  {
    return this.str;
  }
}

Date.prototype.desamber = function()
{
  var start = new Date(this.getFullYear(), 0, 0);
  var diff = (this - start) + ((start.getTimezoneOffset() - this.getTimezoneOffset()) * 60 * 1000);
  var doty = Math.floor(diff/86400000);
  var y = this.getFullYear().toString().substr(2,2);
  var m = String.fromCharCode(97 + Math.floor(((doty-1)/364) * 26)).toUpperCase(); m = doty == 365 || doty == 366 ? "+" : m;
  var d = (doty % 14); d = d < 10 ? `0${d}` : d; d = d == "00" ? "14" : d; d = doty == 365 ? "01" : (doty == 366 ? "02" : d);
  return new Desamber(`${y}${m}${d}`);
}

function Calendar()
{
  this.toString = function()
  {
    return new Date().desamber().toString();
  }

  this.menu = function()
  {
    return {label: this.toString(), enabled: false};
  }
}