import { getUnixTime } from "date-fns";

export const gen = () => {
  // js 获取当前时间戳
  // 当前时间戳
  let now_timestamp = getUnixTime(new Date());
  let sina_global = `${Math.floor(Math.random() * 10000000000000)}.${Math.floor(
    Math.random() * 10000
  )}.${now_timestamp - 14 - 1072340 - 6}`;
  let apache = `${Math.floor(Math.random() * 10000000000000)}.${Math.floor(
    Math.random() * 10000
  )}.${now_timestamp - 14}`;
  let ulv = `${now_timestamp}:2:2:2:${Math.floor(
    Math.random() * 10000000000000
  )}.${Math.floor(Math.random() * 10000)}.${now_timestamp - 14}:${
    now_timestamp - 14 - 1072340
  }`;
  let cookie_result = `SUB=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX; SUBP=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX; SINAGLOBAL=${sina_global}; _s_tentry=-; Apache=${apache}; ULV==${ulv}`;
  return "SINAGLOBAL=3213645683841.8013.1685068216779; SCF=AjIqrSUZaDGhDyZ7K_99WccMFx0bva11vRRDEEIXC80mQRVuOYDvQ_YyKlZBrxAP28b9kopj13qVOB9j_Az8PLA.; UOR=,,www.baidu.com; ULV=1708570389157:39:1:1:903857019115.0863.1708570389155:1702967691113; SUB=_2AkMSijgrf8NxqwFRmfoTz2_ma49xzA_EieKk1snwJRMxHRl-yT9kqmMltRB6OQoWxFM7QhmYyAM1gmqAjwFoa-B3fh0r; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9WFd4-QBKDCpwkpvBZoCnu60; XSRF-TOKEN=gIq20fvHDhlgnLeaG-BpPRYF; WBPSESS=V0zdZ7jH8_6F0CA8c_ussS7PfjFojzagulrzl4dcWFToxa_ieY-A55aO52bzr-cTRkeS1sqAbpnOOAI7oUcdlqKuaotApxT-8RIGaFjHho2_K6i0oacZtPuMDQJSgCjR";
};
