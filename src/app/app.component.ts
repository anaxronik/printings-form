import { Component } from '@angular/core';

type Item = {
  name: string;
  url: string;
  fileName?: string;
};

const COMMON_URL = 'https://gateway.cdek.ru/printing-forms/web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  orderNumber = '';
  isLoading = false;

  items: Item[] = [
    {
      name: 'Импорт РФ - Армения',
      url: COMMON_URL + '/reestr_armenia/',
    },
    {
      name: 'C2C Импорт в Грузию (авиа)',
      url: COMMON_URL + '/reestr_c2c_import_georgia/',
    },
    {
      name: 'Реестр Китай(авиа)',
      url: COMMON_URL + '/reestr_chn_air/',
    },
    {
      name: 'Таможенная очистка Китай',
      url: COMMON_URL + '/reestr_chn_customs_clearence/',
    },
    {
      name: 'Реестр Китай(наземный)',
      url: COMMON_URL + '/reestr_chn_gnd/',
    },
    {
      name: 'Реестр Китай Business Standard 200-',
      url: COMMON_URL + '/reestr_chn_two_hundred_minus/',
    },
    {
      name: 'Реестр Китай Business Standard 200+',
      url: COMMON_URL + '/reestr_chn_two_hundred_plus/',
    },
    {
      name: 'Реестр Documents Express',
      url: COMMON_URL + '/reestr_document_express_reestr/',
    },
    {
      name: 'Реестр Азербайджан',
      url: COMMON_URL + '/reestr_export_aze/',
    },
    {
      name: 'Экспорт из Грузии (авиа)',
      url: COMMON_URL + '/reestr_export_georgia_air/',
    },
    {
      name: 'B2C Импорт в Грузию (авиа)',
      url: COMMON_URL + '/reestr_georgia_b2c_import/',
    },
    {
      name: 'Реестр Беларусь',
      url: COMMON_URL + '/reestr_import_to_belarus/',
    },
    {
      name: 'Реестр Германия',
      url: COMMON_URL + '/reestr_invoice_deu/',
    },
    {
      name: 'Английский инвойс, eng',
      url: COMMON_URL + '/reestr_invoice_eng_eng/',
    },
    {
      name: 'Английский инвойс, rus',
      url: COMMON_URL + '/reestr_invoice_eng_rus/',
    },
    {
      name: 'Реестр USA',
      url: COMMON_URL + '/reestr_invoice_usa/',
    },
    {
      name: 'Реестр Израиль',
      url: COMMON_URL + '/reestr_israel/',
    },
    {
      name: 'Английский реестр Израиль',
      url: COMMON_URL + '/reestr_israel_eng/',
    },
    {
      name: 'Реестр ITALY',
      url: COMMON_URL + '/reestr_italy/',
    },
    {
      name: 'Реестр Калининград',
      url: COMMON_URL + '/reestr_kaliningrad/',
    },
    {
      name: 'Реестр РФ - Азербайджан',
      url: COMMON_URL + '/reestr_rf_azerbaijan/',
    },
    {
      name: 'Руспост eu',
      url: COMMON_URL + '/reestr_rus_post_eu/',
    },
    {
      name: 'Руспост us',
      url: COMMON_URL + '/reestr_rus_post_us/',
    },
    {
      name: 'В2С/В2В Реестр. Импорт в РФ',
      url: COMMON_URL + '/reestr_russia_import_b2b_b2c/',
    },
    {
      name: 'Реестр Грузия - РФ (авиа)',
      url: COMMON_URL + '/reestr_georgia_russia_air/',
    },
    {
      name: 'С2С Реестр, Импорт в РФ',
      url: COMMON_URL + '/reestr_russia_import_c2c/',
    },
    {
      name: 'Реестр на экспорт',
      url: COMMON_URL + '/reestr_russia_russia_export/',
    },
    {
      name: 'Реестр Lognetix',
      url: COMMON_URL + '/reestr_lognetix/',
    },
    {
      name: 'Р. Турция',
      url: COMMON_URL + '/reestr_turkey/',
    },
    {
      name: 'Реестр Турция-Азербайджан',
      url: COMMON_URL + '/reestr_turkey_azerbaijan/',
    },
    {
      name: 'Импортный реестр США',
      url: COMMON_URL + '/reestr_usa_import/',
    },
    {
      name: 'Реестр США - Казахстан',
      url: COMMON_URL + '/reestr_usa_kazakhstan/',
    },
    {
      name: 'Импорт в Сербию',
      url: COMMON_URL + '/reestr_serbia_import/',
    },
    {
      name: 'Импорт в Узбекистан',
      url: COMMON_URL + '/reestr_uzbekistan_import/',
    },
    {
      name: 'universal_invoice',
      url: COMMON_URL + '/universal_invoice/',
    },
    {
      name: 'universal_invoice_word',
      url: COMMON_URL + '/universal_invoice_word/',
    },
  ];

  onClickItem = (item: Item) => {
    console.log(item);
    this.isLoading = true;

    const orderNumbers = String(this.orderNumber)
      .split('\n')
      .map((i) => String(i).trim());
    console.log({ orderNumbers });

    fetch(item.url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'X-Auth-Token': getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: orderNumbers,
        lang: 'rus',
      }),
    })
      .then(async (res) => {
        console.log('res', res);
        try {
          const blob = await res.blob();
          const blobUrl = URL.createObjectURL(blob);
          saveFile(blobUrl, item.fileName || item.name + '.xlsx');
          URL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error(error);
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  };
}

function getToken() {
  const defaultToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJleHAiOjE3MTcxMTI3NzcsImxvZ2luIjoiaXZhbm92LnZhIiwidXVpZCI6Ijc1NTU5ZjkyLTgzNTItNDA3NC1iM2FlLTlhODBhYTYxZmJiMCIsImRldmljZSI6Im5hdmZyb250bmciLCJpbmRpdmlkdWFsVXVpZCI6ImZhN2I2MjQxLWZhODgtNDA5ZS05NzU0LTI0YzEyMDAzZDJiOCIsImhhc0V4Y2hhbmdlIjpmYWxzZSwicHdkRXhwSW5EYXlzIjo1MiwiaXNzIjoiaHR0cHM6Ly9wZHAucHJvZHVjdGlvbi5rOHMtbG9jYWwuY2Rlay5ydTo4MCIsInVzZXIiOnsiaWQiOjE0NDMyMywidXVpZCI6IjMxZTM1YWQ1LTljODAtNDg5Ny05ODAxLTk5N2NlOWY2Yzg4NSIsImVtcGxveWVlVXVpZCI6ImJjYWNlNDA2LTUwZmItNDAxYS05NDNlLTA3MWQ2ZGJmYzZhMSIsInBvc2l0aW9uIjp7InV1aWQiOiJjOGJlNjZkMy05Y2QwLTQyOWYtYWYwYy05YmNlOTIwOTFlMWIiLCJuYW1lIjoiIiwibmFtZXMiOnsicnVzIjoi0J_RgNC-0LPRgNCw0LzQvNC40YHRgiDQv9C40YLQvtC9In19LCJvZmZpY2UiOnsidXVpZCI6IjJmZDQ4M2RjLTI4MzItNGRkNy1iNDg2LTAwNzY4NWYzNTU1NSIsIm5hbWUiOiIifX0sInVzZXJJZCI6MTQ0MzIzLCJ1c2VyVXVpZCI6IjMxZTM1YWQ1LTljODAtNDg5Ny05ODAxLTk5N2NlOWY2Yzg4NSIsImVtcGxveWVlVXVpZCI6ImJjYWNlNDA2LTUwZmItNDAxYS05NDNlLTA3MWQ2ZGJmYzZhMSIsInBvc2l0aW9uVXVpZCI6ImM4YmU2NmQzLTljZDAtNDI5Zi1hZjBjLTliY2U5MjA5MWUxYiIsIm9mZmljZVV1aWQiOiIyZmQ0ODNkYy0yODMyLTRkZDctYjQ4Ni0wMDc2ODVmMzU1NTUifQ.W4h9K2dS6tX_O1uszrBedzpikvJyltApISR8ko-ur-0w_nCQ9mw4VBQ-zKSrpAHYU_6RK1WZbSQOezX2yKo0i3Ff5zOH-I3zE5fidkwKX9HSZ0njRlF1wQDC_jhfROqTAhG4RUpCjY3SWRIfxmo81svYiEG0lgjFsnYuKjD__WfXuhuzubMgryv_GkHaycX-oupHP0k2bQ628rs4bqDlu06Zj4NUha5P2jjTRbgRHMdf2GP_0dt9l3CsYeIHvYNH3N9gbcgjv-IX_NexHu1tn9J4vZfeLf2xycU7yhPCSjVtSFXB4o65ByHeq4_xzi8lygtPJb0CZ8yqMXMiW1BCrUgQN1fGbd9oVRB3qkbJie-iRieuPUURAu8UhQcdZzfN71LFaI7gQDnX4iLdgfQJb8mR7ZAYNNFGeQ_TOs_cYA9zxPUf9wW8AJ65tjxuNK1bSETYWTnSIZ28oyRgBgJeogM2a2Sgb-S8grytN2A7YxLSnwSlbmOKPng0wmfpgh6qiEvANHnRTLffkbnleFgC1wR-0RPbU5gTitbmQvQWXx2Wmkvk-VvFj8CfQ1rtP4TMixTruur7KdevDdgDsclyGrcVquxqXChmuOfzaPC_JmQKgpHkEYawZrVNwTpu5aJyokzUeDCjMl86EkByd1QRI-aCSNb0qpRJ8p7-IYbD2g4';
  const token = sessionStorage.getItem('pwt') || defaultToken;
  return token;
}

function saveFile(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'file-name';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
