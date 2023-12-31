/* http://keith-wood.name/calendars.html
   Persian calendar for jQuery v1.2.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2009.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it.
   Note: Has been altered from the original source to use transliterated 
   Afghan Persian month names.
    */
(function($) {
    function PersianCalendar(a) {
        this.local = this.regional[a || ''] || this.regional['']
    }
    PersianCalendar.prototype = new $.calendars.baseCalendar;
    $.extend(PersianCalendar.prototype, {
        name: 'Persian',
        jdEpoch: 1948320.5,
        daysPerMonth: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
        hasYearZero: false,
        minMonth: 1,
        firstMonth: 1,
        minDay: 1,
        regional: {
            '': {
                name: 'Persian',
                epochs: ['BP', 'AP'],
                monthNames: ['Hamal', 'Sawr', 'Jawzā', 'Saratān', 'Asad', 'Sonbola', 'Mizān', '‘Aqrab', 'Qaws', 'Jadi' , 'Dalvæ', 'Hūt'],
                monthNamesShort: ['Ham', 'Saw', 'Jaw', 'Sar', 'Asa', 'Son', 'Miz', 'Aqr', 'Qaw', 'Jad', 'Dal', 'Hūt'],
                dayNames: ['Yekshambe', 'Doshambe', 'Seshambe', 'Chæharshambe', 'Panjshambe', 'Jom\'e', 'Shambe'],
                dayNamesShort: ['Yek', 'Do', 'Se', 'Chæ', 'Panj', 'Jom', 'Sha'],
                dayNamesMin: ['Ye', 'Do', 'Se', 'Ch', 'Pa', 'Jo', 'Sh'],
                dateFormat: 'yyyy/mm/dd',
                firstDay: 6,
                isRTL: false
            }
        },
        leapYear: function(a) {
            var b = this._validate(a, this.minMonth, this.minDay, $.calendars.local.invalidYear);
            return (((((b.year() - (b.year() > 0 ? 474 : 473)) % 2820) + 474 + 38) * 682) % 2816) < 682
        },
        weekOfYear: function(a, b, c) {
            var d = this.newDate(a, b, c);
            d.add(-((d.dayOfWeek() + 1) % 7), 'd');
            return Math.floor((d.dayOfYear() - 1) / 7) + 1
        },
        daysInMonth: function(a, b) {
            var c = this._validate(a, b, this.minDay, $.calendars.local.invalidMonth);
            return this.daysPerMonth[c.month() - 1] + (c.month() == 12 && this.leapYear(c.year()) ? 1 : 0)
        },
        weekDay: function(a, b, c) {
            return this.dayOfWeek(a, b, c) != 5
        },
        toJD: function(a, b, c) {
            var d = this._validate(a, b, c, $.calendars.local.invalidDate);
            a = d.year();
            b = d.month();
            c = d.day();
            var e = a - (a >= 0 ? 474 : 473);
            var f = 474 + mod(e, 2820);
            return c + (b <= 7 ? (b - 1) * 31 : (b - 1) * 30 + 6) + Math.floor((f * 682 - 110) / 2816) + (f - 1) * 365 + Math.floor(e / 2820) * 1029983 + this.jdEpoch - 1
        },
        fromJD: function(a) {
            a = Math.floor(a) + 0.5;
            var b = a - this.toJD(475, 1, 1);
            var c = Math.floor(b / 1029983);
            var d = mod(b, 1029983);
            var e = 2820;
            if (d != 1029982) {
                var f = Math.floor(d / 366);
                var g = mod(d, 366);
                e = Math.floor(((2134 * f) + (2816 * g) + 2815) / 1028522) + f + 1
            }
            var h = e + (2820 * c) + 474;
            h = (h <= 0 ? h - 1 : h);
            var i = a - this.toJD(h, 1, 1) + 1;
            var j = (i <= 186 ? Math.ceil(i / 31) : Math.ceil((i - 6) / 30));
            var k = a - this.toJD(h, j, 1) + 1;
            return this.newDate(h, j, k)
        }
    });

    function mod(a, b) {
        return a - (b * Math.floor(a / b))
    }
    $.calendars.calendars.persian = PersianCalendar;
    $.calendars.calendars.jalali = PersianCalendar
})(jQuery);