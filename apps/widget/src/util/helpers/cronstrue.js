/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/no-shadow */
!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define('cronstrue', [], e)
    : 'object' == typeof exports
    ? (exports.cronstrue = e())
    : (t.cronstrue = e());
})(globalThis, () =>
  (() => {
    'use strict';
    var t = {
        794: (t, e, n) => {
          Object.defineProperty(e, '__esModule', {
            value: !0,
          }),
            (e.CronParser = void 0);
          var r = n(586),
            i = (function () {
              function t(t, e, n) {
                void 0 === e && (e = !0),
                  void 0 === n && (n = !1),
                  (this.expression = t),
                  (this.dayOfWeekStartIndexZero = e),
                  (this.monthStartIndexZero = n);
              }

              return (
                (t.prototype.parse = function () {
                  var t, e;
                  if ((null !== (t = this.expression) && void 0 !== t ? t : '').startsWith('@')) {
                    var n = this.parseSpecial(this.expression);
                    e = this.extractParts(n);
                  } else e = this.extractParts(this.expression);

                  return this.normalize(e), this.validate(e), e;
                }),
                (t.prototype.parseSpecial = function (t) {
                  var e = {
                    '@yearly': '0 0 1 1 *',
                    '@annually': '0 0 1 1 *',
                    '@monthly': '0 0 1 * *',
                    '@weekly': '0 0 * * 0',
                    '@daily': '0 0 * * *',
                    '@midnight': '0 0 * * *',
                    '@hourly': '0 * * * *',
                  }[t];
                  if (!e) throw new Error('Unknown special expression.');

                  return e;
                }),
                (t.prototype.extractParts = function (t) {
                  if (!this.expression) throw new Error('cron expression is empty');
                  for (var e = t.trim().split(/[ ]+/), n = 0; n < e.length; n++)
                    if (e[n].includes(',')) {
                      var r = e[n]
                        .split(',')
                        .map(function (t) {
                          return t.trim();
                        })
                        .filter(function (t) {
                          return '' !== t;
                        })
                        .map(function (t) {
                          return isNaN(Number(t)) ? t : Number(t);
                        })
                        .filter(function (t) {
                          return null !== t && '' !== t;
                        });
                      0 === r.length && r.push('*'),
                        r.sort(function (t, e) {
                          return null !== t && null !== e ? t - e : 0;
                        }),
                        (e[n] = r
                          .map(function (t) {
                            return null !== t ? t.toString() : '';
                          })
                          .join(','));
                    }
                  if (e.length < 5)
                    throw new Error(
                      'Expression has only '
                        .concat(e.length, ' part')
                        .concat(1 == e.length ? '' : 's', '. At least 5 parts are required.')
                    );
                  if (5 == e.length) e.unshift(''), e.push('');
                  else if (6 == e.length) {
                    /\d{4}$/.test(e[5]) || '?' == e[4] || '?' == e[2] ? e.unshift('') : e.push('');
                  } else if (e.length > 7) throw new Error('Expression has '.concat(e.length, ' parts; too many!'));

                  return e;
                }),
                (t.prototype.normalize = function (t) {
                  var e = this;
                  if (
                    ((t[3] = t[3].replace('?', '*')),
                    (t[5] = t[5].replace('?', '*')),
                    (t[2] = t[2].replace('?', '*')),
                    0 == t[0].indexOf('0/') && (t[0] = t[0].replace('0/', '*/')),
                    0 == t[1].indexOf('0/') && (t[1] = t[1].replace('0/', '*/')),
                    0 == t[2].indexOf('0/') && (t[2] = t[2].replace('0/', '*/')),
                    0 == t[3].indexOf('1/') && (t[3] = t[3].replace('1/', '*/')),
                    0 == t[4].indexOf('1/') && (t[4] = t[4].replace('1/', '*/')),
                    0 == t[6].indexOf('1/') && (t[6] = t[6].replace('1/', '*/')),
                    (t[5] = t[5].replace(/(^\d)|([^#/\s]\d)/g, function (t) {
                      var n = t.replace(/\D/, ''),
                        r = n;

                      return (
                        e.dayOfWeekStartIndexZero ? '7' == n && (r = '0') : (r = (parseInt(n) - 1).toString()),
                        t.replace(n, r)
                      );
                    })),
                    'L' == t[5] && (t[5] = '6'),
                    '?' == t[3] && (t[3] = '*'),
                    t[3].indexOf('W') > -1 && (t[3].indexOf(',') > -1 || t[3].indexOf('-') > -1))
                  )
                    throw new Error(
                      "The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days."
                    );
                  var n = {
                    SUN: 0,
                    MON: 1,
                    TUE: 2,
                    WED: 3,
                    THU: 4,
                    FRI: 5,
                    SAT: 6,
                  };
                  for (var r in n) t[5] = t[5].replace(new RegExp(r, 'gi'), n[r].toString());
                  t[4] = t[4].replace(/(^\d{1,2})|([^#/\s]\d{1,2})/g, function (t) {
                    var n = t.replace(/\D/, ''),
                      r = n;

                    return e.monthStartIndexZero && (r = (parseInt(n) + 1).toString()), t.replace(n, r);
                  });
                  var i = {
                    JAN: 1,
                    FEB: 2,
                    MAR: 3,
                    APR: 4,
                    MAY: 5,
                    JUN: 6,
                    JUL: 7,
                    AUG: 8,
                    SEP: 9,
                    OCT: 10,
                    NOV: 11,
                    DEC: 12,
                  };
                  for (var o in i) t[4] = t[4].replace(new RegExp(o, 'gi'), i[o].toString());
                  '0' == t[0] && (t[0] = ''),
                    /\*|\-|\,|\//.test(t[2]) ||
                      (!/\*|\//.test(t[1]) && !/\*|\//.test(t[0])) ||
                      (t[2] += '-'.concat(t[2]));
                  for (var s = 0; s < t.length; s++)
                    if (
                      (-1 != t[s].indexOf(',') &&
                        (t[s] =
                          t[s]
                            .split(',')
                            .filter(function (t) {
                              return '' !== t;
                            })
                            .join(',') || '*'),
                      '*/1' == t[s] && (t[s] = '*'),
                      t[s].indexOf('/') > -1 && !/^\*|\-|\,/.test(t[s]))
                    ) {
                      var a = null;
                      switch (s) {
                        case 4:
                          a = '12';
                          break;
                        case 5:
                          a = '6';
                          break;
                        case 6:
                          a = '9999';
                          break;
                        default:
                          a = null;
                      }
                      if (null !== a) {
                        var u = t[s].split('/');
                        t[s] = ''.concat(u[0], '-').concat(a, '/').concat(u[1]);
                      }
                    }
                }),
                (t.prototype.validate = function (t) {
                  this.assertNoInvalidCharacters('DOW', t[5]),
                    this.assertNoInvalidCharacters('DOM', t[3]),
                    this.validateRange(t);
                }),
                (t.prototype.validateRange = function (t) {
                  r.default.secondRange(t[0]),
                    r.default.minuteRange(t[1]),
                    r.default.hourRange(t[2]),
                    r.default.dayOfMonthRange(t[3]),
                    r.default.monthRange(t[4], this.monthStartIndexZero),
                    r.default.dayOfWeekRange(t[5], this.dayOfWeekStartIndexZero);
                }),
                (t.prototype.assertNoInvalidCharacters = function (t, e) {
                  var n = e.match(/[A-KM-VX-Z]+/gi);
                  if (n && n.length)
                    throw new Error(''.concat(t, " part contains invalid values: '").concat(n.toString(), "'"));
                }),
                t
              );
            })();
          e.CronParser = i;
        },
        728: (t, e, n) => {
          Object.defineProperty(e, '__esModule', {
            value: !0,
          }),
            (e.ExpressionDescriptor = void 0);
          var r = n(910),
            i = n(794),
            o = (function () {
              function t(e, n) {
                if (
                  ((this.expression = e),
                  (this.options = n),
                  (this.expressionParts = new Array(5)),
                  !this.options.locale && t.defaultLocale && (this.options.locale = t.defaultLocale),
                  !t.locales[this.options.locale])
                ) {
                  var r = Object.keys(t.locales)[0];
                  console.warn(
                    "Locale '".concat(this.options.locale, "' could not be found; falling back to '").concat(r, "'.")
                  ),
                    (this.options.locale = r);
                }
                (this.i18n = t.locales[this.options.locale]),
                  void 0 === n.use24HourTimeFormat &&
                    (n.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault());
              }

              return (
                (t.toString = function (e, n) {
                  var r = void 0 === n ? {} : n,
                    i = r.throwExceptionOnParseError,
                    o = void 0 === i || i,
                    s = r.verbose,
                    a = void 0 !== s && s,
                    u = r.dayOfWeekStartIndexZero,
                    c = void 0 === u || u,
                    f = r.monthStartIndexZero,
                    h = void 0 !== f && f,
                    p = r.use24HourTimeFormat,
                    l = r.locale,
                    y = void 0 === l ? null : l,
                    m = r.tzOffset;

                  return new t(e, {
                    throwExceptionOnParseError: o,
                    verbose: a,
                    dayOfWeekStartIndexZero: c,
                    monthStartIndexZero: h,
                    use24HourTimeFormat: p,
                    locale: y,
                    tzOffset: void 0 === m ? 0 : m,
                  }).getFullDescription();
                }),
                (t.initialize = function (e, n) {
                  void 0 === n && (n = 'en'),
                    (t.specialCharacters = ['/', '-', ',', '*']),
                    (t.defaultLocale = n),
                    e.load(t.locales);
                }),
                (t.prototype.getFullDescription = function () {
                  var t = '';
                  try {
                    var e = new i.CronParser(
                      this.expression,
                      this.options.dayOfWeekStartIndexZero,
                      this.options.monthStartIndexZero
                    );
                    this.expressionParts = e.parse();
                    var n = this.getTimeOfDayDescription(),
                      r = this.getDayOfMonthDescription(),
                      o = this.getMonthDescription();
                    (t += n + r + this.getDayOfWeekDescription() + o + this.getYearDescription()),
                      (t =
                        (t = this.transformVerbosity(t, !!this.options.verbose)).charAt(0).toLocaleUpperCase() +
                        t.substr(1));
                  } catch (e) {
                    if (this.options.throwExceptionOnParseError) throw ''.concat(e);
                    t = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
                  }

                  return t;
                }),
                (t.prototype.getTimeOfDayDescription = function () {
                  var e = this.expressionParts[0],
                    n = this.expressionParts[1],
                    i = this.expressionParts[2],
                    o = '';
                  if (
                    r.StringUtilities.containsAny(n, t.specialCharacters) ||
                    r.StringUtilities.containsAny(i, t.specialCharacters) ||
                    r.StringUtilities.containsAny(e, t.specialCharacters)
                  )
                    if (
                      e ||
                      !(n.indexOf('-') > -1) ||
                      n.indexOf(',') > -1 ||
                      n.indexOf('/') > -1 ||
                      r.StringUtilities.containsAny(i, t.specialCharacters)
                    )
                      if (
                        !e &&
                        i.indexOf(',') > -1 &&
                        -1 == i.indexOf('-') &&
                        -1 == i.indexOf('/') &&
                        !r.StringUtilities.containsAny(n, t.specialCharacters)
                      ) {
                        var s = i.split(',');
                        o += this.i18n.at();
                        for (var a = 0; a < s.length; a++)
                          (o += ' '),
                            (o += this.formatTime(s[a], n, '')),
                            a < s.length - 2 && (o += ','),
                            a == s.length - 2 && (o += this.i18n.spaceAnd());
                      } else {
                        var u = this.getSecondsDescription(),
                          c = this.getMinutesDescription(),
                          f = this.getHoursDescription();
                        if (((o += u) && c && (o += ', '), (o += c), c === f)) return o;
                        o && f && (o += ', '), (o += f);
                      }
                    else {
                      var h = n.split('-');
                      o += r.StringUtilities.format(
                        this.i18n.everyMinuteBetweenX0AndX1(),
                        this.formatTime(i, h[0], ''),
                        this.formatTime(i, h[1], '')
                      );
                    }
                  else o += this.i18n.atSpace() + this.formatTime(i, n, e);

                  return o;
                }),
                (t.prototype.getSecondsDescription = function () {
                  var t = this;

                  return this.getSegmentDescription(
                    this.expressionParts[0],
                    this.i18n.everySecond(),
                    function (t) {
                      return t;
                    },
                    function (e) {
                      return r.StringUtilities.format(t.i18n.everyX0Seconds(e), e);
                    },
                    function (e) {
                      return t.i18n.secondsX0ThroughX1PastTheMinute();
                    },
                    function (e) {
                      return '0' == e
                        ? ''
                        : parseInt(e) < 20
                        ? t.i18n.atX0SecondsPastTheMinute(e)
                        : t.i18n.atX0SecondsPastTheMinuteGt20() || t.i18n.atX0SecondsPastTheMinute(e);
                    }
                  );
                }),
                (t.prototype.getMinutesDescription = function () {
                  var t = this,
                    e = this.expressionParts[0],
                    n = this.expressionParts[2];

                  return this.getSegmentDescription(
                    this.expressionParts[1],
                    this.i18n.everyMinute(),
                    function (t) {
                      return t;
                    },
                    function (e) {
                      return r.StringUtilities.format(t.i18n.everyX0Minutes(e), e);
                    },
                    function (e) {
                      return t.i18n.minutesX0ThroughX1PastTheHour();
                    },
                    function (r) {
                      try {
                        return '0' == r && -1 == n.indexOf('/') && '' == e
                          ? t.i18n.everyHour()
                          : parseInt(r) < 20
                          ? t.i18n.atX0MinutesPastTheHour(r)
                          : t.i18n.atX0MinutesPastTheHourGt20() || t.i18n.atX0MinutesPastTheHour(r);
                      } catch (e) {
                        return t.i18n.atX0MinutesPastTheHour(r);
                      }
                    }
                  );
                }),
                (t.prototype.getHoursDescription = function () {
                  var t = this,
                    e = this.expressionParts[2],
                    n = this.getSegmentDescription(
                      e,
                      this.i18n.everyHour(),
                      function (e) {
                        return t.formatTime(e, '0', '');
                      },
                      function (e) {
                        return r.StringUtilities.format(t.i18n.everyX0Hours(e), e);
                      },
                      function (e) {
                        return t.i18n.betweenX0AndX1();
                      },
                      function (e) {
                        return t.i18n.atX0();
                      }
                    );
                  if (n && e.includes('-') && '0' != this.expressionParts[1]) {
                    var i = Array.from(n.matchAll(/:00/g));
                    if (i.length > 1) {
                      var o = i[i.length - 1].index;
                      n = n.substring(0, o) + ':59' + n.substring(o + 3);
                    }
                  }

                  return n;
                }),
                (t.prototype.getDayOfWeekDescription = function () {
                  var t = this,
                    e = this.i18n.daysOfTheWeek();

                  return '*' == this.expressionParts[5]
                    ? ''
                    : this.getSegmentDescription(
                        this.expressionParts[5],
                        this.i18n.commaEveryDay(),
                        function (n, r) {
                          var i = n;
                          n.indexOf('#') > -1
                            ? (i = n.substring(0, n.indexOf('#')))
                            : n.indexOf('L') > -1 && (i = i.replace('L', ''));
                          var o = parseInt(i);
                          if (t.options.tzOffset) {
                            var s = t.expressionParts[2],
                              a = parseInt(s) + (t.options.tzOffset ? t.options.tzOffset : 0);
                            a >= 24 ? o++ : a < 0 && o--, o > 6 ? (o = 0) : o < 0 && (o = 6);
                          }
                          var u = t.i18n.daysOfTheWeekInCase ? t.i18n.daysOfTheWeekInCase(r)[o] : e[o];
                          if (n.indexOf('#') > -1) {
                            var c = null,
                              f = n.substring(n.indexOf('#') + 1),
                              h = n.substring(0, n.indexOf('#'));
                            switch (f) {
                              case '1':
                                c = t.i18n.first(h);
                                break;
                              case '2':
                                c = t.i18n.second(h);
                                break;
                              case '3':
                                c = t.i18n.third(h);
                                break;
                              case '4':
                                c = t.i18n.fourth(h);
                                break;
                              case '5':
                                c = t.i18n.fifth(h);
                            }
                            u = c + ' ' + u;
                          }

                          return u;
                        },
                        function (e) {
                          return 1 == parseInt(e)
                            ? ''
                            : r.StringUtilities.format(t.i18n.commaEveryX0DaysOfTheWeek(e), e);
                        },
                        function (e) {
                          var n = e.substring(0, e.indexOf('-'));

                          return '*' != t.expressionParts[3]
                            ? t.i18n.commaAndX0ThroughX1(n)
                            : t.i18n.commaX0ThroughX1(n);
                        },
                        function (e) {
                          var n = null;
                          if (e.indexOf('#') > -1) {
                            var r = e.substring(e.indexOf('#') + 1);
                            n = t.i18n.commaOnThe(r).trim() + t.i18n.spaceX0OfTheMonth();
                          } else if (e.indexOf('L') > -1) n = t.i18n.commaOnTheLastX0OfTheMonth(e.replace('L', ''));
                          else {
                            n = '*' != t.expressionParts[3] ? t.i18n.commaAndOnX0() : t.i18n.commaOnlyOnX0(e);
                          }

                          return n;
                        }
                      );
                }),
                (t.prototype.getMonthDescription = function () {
                  var t = this,
                    e = this.i18n.monthsOfTheYear();

                  return this.getSegmentDescription(
                    this.expressionParts[4],
                    '',
                    function (n, r) {
                      return r && t.i18n.monthsOfTheYearInCase
                        ? t.i18n.monthsOfTheYearInCase(r)[parseInt(n) - 1]
                        : e[parseInt(n) - 1];
                    },
                    function (e) {
                      return 1 == parseInt(e) ? '' : r.StringUtilities.format(t.i18n.commaEveryX0Months(e), e);
                    },
                    function (e) {
                      return t.i18n.commaMonthX0ThroughMonthX1() || t.i18n.commaX0ThroughX1();
                    },
                    function (e) {
                      return t.i18n.commaOnlyInMonthX0 ? t.i18n.commaOnlyInMonthX0() : t.i18n.commaOnlyInX0();
                    }
                  );
                }),
                (t.prototype.getDayOfMonthDescription = function () {
                  var t = this,
                    e = null,
                    n = this.expressionParts[3];
                  switch (n) {
                    case 'L':
                      e = this.i18n.commaOnTheLastDayOfTheMonth();
                      break;
                    case 'WL':
                    case 'LW':
                      e = this.i18n.commaOnTheLastWeekdayOfTheMonth();
                      break;
                    default:
                      var i = n.match(/(\d{1,2}W)|(W\d{1,2})/);
                      if (i) {
                        var o = parseInt(i[0].replace('W', '')),
                          s =
                            1 == o
                              ? this.i18n.firstWeekday()
                              : r.StringUtilities.format(this.i18n.weekdayNearestDayX0(), o.toString());
                        e = r.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), s);
                        break;
                      }
                      var a = n.match(/L-(\d{1,2})/);
                      if (a) {
                        var u = a[1];
                        e = r.StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(u), u);
                        break;
                      }
                      if ('*' == n && '*' != this.expressionParts[5]) return '';
                      e = this.getSegmentDescription(
                        n,
                        this.i18n.commaEveryDay(),
                        function (e) {
                          return 'L' == e
                            ? t.i18n.lastDay()
                            : t.i18n.dayX0
                            ? r.StringUtilities.format(t.i18n.dayX0(), e)
                            : e;
                        },
                        function (e) {
                          return '1' == e ? t.i18n.commaEveryDay() : t.i18n.commaEveryX0Days(e);
                        },
                        function (e) {
                          return t.i18n.commaBetweenDayX0AndX1OfTheMonth(e);
                        },
                        function (e) {
                          return t.i18n.commaOnDayX0OfTheMonth(e);
                        }
                      );
                  }

                  return e;
                }),
                (t.prototype.getYearDescription = function () {
                  var t = this;

                  return this.getSegmentDescription(
                    this.expressionParts[6],
                    '',
                    function (t) {
                      return /^\d+$/.test(t) ? new Date(parseInt(t), 1).getFullYear().toString() : t;
                    },
                    function (e) {
                      return r.StringUtilities.format(t.i18n.commaEveryX0Years(e), e);
                    },
                    function (e) {
                      return t.i18n.commaYearX0ThroughYearX1() || t.i18n.commaX0ThroughX1();
                    },
                    function (e) {
                      return t.i18n.commaOnlyInYearX0 ? t.i18n.commaOnlyInYearX0() : t.i18n.commaOnlyInX0();
                    }
                  );
                }),
                (t.prototype.getSegmentDescription = function (t, e, n, i, o, s) {
                  var a = null,
                    u = t.indexOf('/') > -1,
                    c = t.indexOf('-') > -1,
                    f = t.indexOf(',') > -1;
                  if (t)
                    if ('*' === t) a = e;
                    else if (u || c || f)
                      if (f) {
                        for (var h = t.split(','), p = '', l = 0; l < h.length; l++)
                          if (
                            (l > 0 && h.length > 2 && ((p += ','), l < h.length - 1 && (p += ' ')),
                            l > 0 &&
                              h.length > 1 &&
                              (l == h.length - 1 || 2 == h.length) &&
                              (p += ''.concat(this.i18n.spaceAnd(), ' ')),
                            h[l].indexOf('/') > -1 || h[l].indexOf('-') > -1)
                          ) {
                            var y = h[l].indexOf('-') > -1 && -1 == h[l].indexOf('/'),
                              m = this.getSegmentDescription(h[l], e, n, i, y ? this.i18n.commaX0ThroughX1 : o, s);
                            y && (m = m.replace(', ', '')), (p += m);
                          } else p += u ? this.getSegmentDescription(h[l], e, n, i, o, s) : n(h[l]);
                        a = u ? p : r.StringUtilities.format(s(t), p);
                      } else if (u) {
                        h = t.split('/');
                        if (((a = r.StringUtilities.format(i(h[1]), h[1])), h[0].indexOf('-') > -1)) {
                          var d = this.generateRangeSegmentDescription(h[0], o, n);
                          0 != d.indexOf(', ') && (a += ', '), (a += d);
                        } else if (-1 == h[0].indexOf('*')) {
                          var g = r.StringUtilities.format(s(h[0]), n(h[0]));
                          (g = g.replace(', ', '')), (a += r.StringUtilities.format(this.i18n.commaStartingX0(), g));
                        }
                      } else c && (a = this.generateRangeSegmentDescription(t, o, n));
                    else a = r.StringUtilities.format(s(t), n(t));
                  else a = '';

                  return a;
                }),
                (t.prototype.generateRangeSegmentDescription = function (t, e, n) {
                  var i = '',
                    o = t.split('-'),
                    s = n(o[0], 1),
                    a = n(o[1], 2),
                    u = e(t);

                  return (i += r.StringUtilities.format(u, s, a));
                }),
                (t.prototype.formatTime = function (t, e, n) {
                  var r = 0,
                    i = 0;
                  this.options.tzOffset &&
                    ((r =
                      this.options.tzOffset > 0 ? Math.floor(this.options.tzOffset) : Math.ceil(this.options.tzOffset)),
                    0 != (i = parseFloat((this.options.tzOffset % 1).toFixed(2))) && (i *= 60));
                  var o = parseInt(t) + r,
                    s = parseInt(e) + i;
                  s >= 60 ? ((s -= 60), (o += 1)) : s < 0 && ((s += 60), (o -= 1)),
                    o >= 24 ? (o -= 24) : o < 0 && (o = 24 + o);
                  var a = '',
                    u = !1;
                  this.options.use24HourTimeFormat ||
                    ((a = (u = !(!this.i18n.setPeriodBeforeTime || !this.i18n.setPeriodBeforeTime()))
                      ? ''.concat(this.getPeriod(o), ' ')
                      : ' '.concat(this.getPeriod(o))),
                    o > 12 && (o -= 12),
                    0 === o && (o = 12));
                  var c = '';

                  return (
                    n && (c = ':'.concat(('00' + n).substring(n.length))),
                    ''
                      .concat(u ? a : '')
                      .concat(('00' + o.toString()).substring(o.toString().length), ':')
                      .concat(('00' + s.toString()).substring(s.toString().length))
                      .concat(c)
                      .concat(u ? '' : a)
                  );
                }),
                (t.prototype.transformVerbosity = function (t, e) {
                  return (
                    e ||
                      (t = (t = (t = (t = t.replace(new RegExp(', '.concat(this.i18n.everyMinute()), 'g'), '')).replace(
                        new RegExp(', '.concat(this.i18n.everyHour()), 'g'),
                        ''
                      )).replace(new RegExp(this.i18n.commaEveryDay(), 'g'), '')).replace(/\, ?$/, '')),
                    t
                  );
                }),
                (t.prototype.getPeriod = function (t) {
                  return t >= 12 ? (this.i18n.pm && this.i18n.pm()) || 'PM' : (this.i18n.am && this.i18n.am()) || 'AM';
                }),
                (t.locales = {}),
                t
              );
            })();
          e.ExpressionDescriptor = o;
        },
        336: (t, e, n) => {
          Object.defineProperty(e, '__esModule', {
            value: !0,
          }),
            (e.enLocaleLoader = void 0);
          var r = n(751),
            i = (function () {
              function t() {}

              return (
                (t.prototype.load = function (t) {
                  t.en = new r.en();
                }),
                t
              );
            })();
          e.enLocaleLoader = i;
        },
        751: (t, e) => {
          Object.defineProperty(e, '__esModule', {
            value: !0,
          }),
            (e.en = void 0);
          var n = (function () {
            function t() {}

            return (
              (t.prototype.atX0SecondsPastTheMinuteGt20 = function () {
                return null;
              }),
              (t.prototype.atX0MinutesPastTheHourGt20 = function () {
                return null;
              }),
              (t.prototype.commaMonthX0ThroughMonthX1 = function () {
                return null;
              }),
              (t.prototype.commaYearX0ThroughYearX1 = function () {
                return null;
              }),
              (t.prototype.use24HourTimeFormatByDefault = function () {
                return !1;
              }),
              (t.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
                return 'An error occured when generating the expression description.  Check the cron expression syntax.';
              }),
              (t.prototype.everyMinute = function () {
                return 'every minute';
              }),
              (t.prototype.everyHour = function () {
                return 'every hour';
              }),
              (t.prototype.atSpace = function () {
                return 'At ';
              }),
              (t.prototype.everyMinuteBetweenX0AndX1 = function () {
                return 'Every minute between %s and %s';
              }),
              (t.prototype.at = function () {
                return 'At';
              }),
              (t.prototype.spaceAnd = function () {
                return ' and';
              }),
              (t.prototype.everySecond = function () {
                return 'every second';
              }),
              (t.prototype.everyX0Seconds = function () {
                return 'every %s seconds';
              }),
              (t.prototype.secondsX0ThroughX1PastTheMinute = function () {
                return 'seconds %s through %s past the minute';
              }),
              (t.prototype.atX0SecondsPastTheMinute = function () {
                return 'at %s seconds past the minute';
              }),
              (t.prototype.everyX0Minutes = function () {
                return 'every %s minutes';
              }),
              (t.prototype.minutesX0ThroughX1PastTheHour = function () {
                return 'minutes %s through %s past the hour';
              }),
              (t.prototype.atX0MinutesPastTheHour = function () {
                return 'at %s minutes past the hour';
              }),
              (t.prototype.everyX0Hours = function () {
                return 'every %s hours';
              }),
              (t.prototype.betweenX0AndX1 = function () {
                return 'between %s and %s';
              }),
              (t.prototype.atX0 = function () {
                return 'at %s';
              }),
              (t.prototype.commaEveryDay = function () {
                return ', every day';
              }),
              (t.prototype.commaEveryX0DaysOfTheWeek = function () {
                return ', every %s days of the week';
              }),
              (t.prototype.commaX0ThroughX1 = function () {
                return ', %s through %s';
              }),
              (t.prototype.commaAndX0ThroughX1 = function () {
                return ', %s through %s';
              }),
              (t.prototype.first = function () {
                return 'first';
              }),
              (t.prototype.second = function () {
                return 'second';
              }),
              (t.prototype.third = function () {
                return 'third';
              }),
              (t.prototype.fourth = function () {
                return 'fourth';
              }),
              (t.prototype.fifth = function () {
                return 'fifth';
              }),
              (t.prototype.commaOnThe = function () {
                return ', on the ';
              }),
              (t.prototype.spaceX0OfTheMonth = function () {
                return ' %s of the month';
              }),
              (t.prototype.lastDay = function () {
                return 'the last day';
              }),
              (t.prototype.commaOnTheLastX0OfTheMonth = function () {
                return ', on the last %s of the month';
              }),
              (t.prototype.commaOnlyOnX0 = function () {
                return ', only on %s';
              }),
              (t.prototype.commaAndOnX0 = function () {
                return ', and on %s';
              }),
              (t.prototype.commaEveryX0Months = function () {
                return ', every %s months';
              }),
              (t.prototype.commaOnlyInX0 = function () {
                return ', only in %s';
              }),
              (t.prototype.commaOnTheLastDayOfTheMonth = function () {
                return ', on the last day of the month';
              }),
              (t.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
                return ', on the last weekday of the month';
              }),
              (t.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
                return ', %s days before the last day of the month';
              }),
              (t.prototype.firstWeekday = function () {
                return 'first weekday';
              }),
              (t.prototype.weekdayNearestDayX0 = function () {
                return 'weekday nearest day %s';
              }),
              (t.prototype.commaOnTheX0OfTheMonth = function () {
                return ', on the %s of the month';
              }),
              (t.prototype.commaEveryX0Days = function () {
                return ', every %s days';
              }),
              (t.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
                return ', between day %s and %s of the month';
              }),
              (t.prototype.commaOnDayX0OfTheMonth = function () {
                return ', on day %s of the month';
              }),
              (t.prototype.commaEveryHour = function () {
                return ', every hour';
              }),
              (t.prototype.commaEveryX0Years = function () {
                return ', every %s years';
              }),
              (t.prototype.commaStartingX0 = function () {
                return ', starting %s';
              }),
              (t.prototype.daysOfTheWeek = function () {
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
              }),
              (t.prototype.monthsOfTheYear = function () {
                return [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ];
              }),
              t
            );
          })();
          e.en = n;
        },
        586: (t, e) => {
          function n(t, e) {
            if (!t) throw new Error(e);
          }
          Object.defineProperty(e, '__esModule', {
            value: !0,
          });
          var r = (function () {
            function t() {}

            return (
              (t.secondRange = function (t) {
                for (var e = t.split(','), r = 0; r < e.length; r++)
                  if (!isNaN(parseInt(e[r], 10))) {
                    var i = parseInt(e[r], 10);
                    n(i >= 0 && i <= 59, 'seconds part must be >= 0 and <= 59');
                  }
              }),
              (t.minuteRange = function (t) {
                for (var e = t.split(','), r = 0; r < e.length; r++)
                  if (!isNaN(parseInt(e[r], 10))) {
                    var i = parseInt(e[r], 10);
                    n(i >= 0 && i <= 59, 'minutes part must be >= 0 and <= 59');
                  }
              }),
              (t.hourRange = function (t) {
                for (var e = t.split(','), r = 0; r < e.length; r++)
                  if (!isNaN(parseInt(e[r], 10))) {
                    var i = parseInt(e[r], 10);
                    n(i >= 0 && i <= 23, 'hours part must be >= 0 and <= 23');
                  }
              }),
              (t.dayOfMonthRange = function (t) {
                for (var e = t.split(','), r = 0; r < e.length; r++)
                  if (!isNaN(parseInt(e[r], 10))) {
                    var i = parseInt(e[r], 10);
                    n(i >= 1 && i <= 31, 'DOM part must be >= 1 and <= 31');
                  }
              }),
              (t.monthRange = function (t, e) {
                for (var r = t.split(','), i = 0; i < r.length; i++)
                  if (!isNaN(parseInt(r[i], 10))) {
                    var o = parseInt(r[i], 10);
                    n(o >= 1 && o <= 12, e ? 'month part must be >= 0 and <= 11' : 'month part must be >= 1 and <= 12');
                  }
              }),
              (t.dayOfWeekRange = function (t, e) {
                for (var r = t.split(','), i = 0; i < r.length; i++)
                  if (!isNaN(parseInt(r[i], 10))) {
                    var o = parseInt(r[i], 10);
                    n(o >= 0 && o <= 6, e ? 'DOW part must be >= 0 and <= 6' : 'DOW part must be >= 1 and <= 7');
                  }
              }),
              t
            );
          })();
          e.default = r;
        },
        910: (t, e) => {
          Object.defineProperty(e, '__esModule', {
            value: !0,
          }),
            (e.StringUtilities = void 0);
          var n = (function () {
            function t() {}

            return (
              (t.format = function (t) {
                for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];

                return t.replace(/%s/g, function (t) {
                  for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];

                  return e.shift();
                });
              }),
              (t.containsAny = function (t, e) {
                return e.some(function (e) {
                  return t.indexOf(e) > -1;
                });
              }),
              t
            );
          })();
          e.StringUtilities = n;
        },
      },
      e = {};

    function n(r) {
      var i = e[r];
      if (void 0 !== i) return i.exports;
      var o = (e[r] = {
        exports: {},
      });

      return t[r](o, o.exports, n), o.exports;
    }
    var r = {};

    return (
      (() => {
        var t = r;
        Object.defineProperty(t, '__esModule', {
          value: !0,
        }),
          (t.toString = void 0);
        var e = n(728),
          i = n(336);
        e.ExpressionDescriptor.initialize(new i.enLocaleLoader()), (t.default = e.ExpressionDescriptor);
        var o = e.ExpressionDescriptor.toString;
        t.toString = o;
      })(),
      r
    );
  })()
);
