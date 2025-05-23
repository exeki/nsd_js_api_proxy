# nsd_js_api_proxy

### Важно

Naumen выпустил библиотеку с подобным функционалом: [@nsmp/js-api](https://www.npmjs.com/package/@nsmp/js-api), но она завязана на
dotenv и webpack. Глобальные переменные, используемые в этой библиотеке, отрезаются фреймворком vue, так что с ним ее использование кажется невозможно.

### Описание

Данная библиотека направлена на упрощение разработки встроенных приложений Naumen Service Desk с JS API.
Основной проблемой при использовании JS API является отладка, тк сам JS API Naumen существует только в среде платформы
одноименного приложения, что заставляет разработчика писать фальшивые реализации этого API что бы воспроизвести целевое
поведение в dev среде, именно эту проблему должна решать библиотека.

### Как это работает

Вся библиотека строится на основе класса JsApiProxy. Экземпляры данного класса имеют все методы и свойства, что и
описанные в
jsApi [в официальной документации Naumen Service Desk](https://www.naumen.ru/docs/sd/4.16/Content/applications/JSAPI_metods.htm).

В момент инициализации объекта JsApiProxy (а точнее получении его экземпляра) библиотека пытается внедрить JS API Naumen
при помощи [описанного в документации способа](https://www.naumen.ru/docs/sd/4.16/Content/applications/JSAPI.htm).
Если получается внедрить jsApi - то вызов скопированных из jsApi методов (методов, которые так же называются и принимают
такие же аргументы) является просто проксированием к внедренному jsApi (то есть фактические не выполняется ничего, кроме
одноименного метода jsApi).
Если не получается внедрить jsApi - система считывает переданную dev конфигурацию и все скопированные из jsApi методы
работают по фальшивой реализации (к примеру при вызове jsApi.restCall() просто отрабатывает fetch, а при вызове
jsApi.getAppBaseUrl() возвращается введенный в dev конфигурацию параметр).

Таким образом библиотека позволяет получить правдоподобное воспроизведение продакшн среды при разработке, и не требует
каких либо манипуляций при размещении написанного кода в продакшене.

### Установка

Данный пакет есть в NPM, выполните команду в терминале в папке проекта для установки:

~~~shell
npm install nsd_js_api_proxy
~~~

### Использование

Использовать библиотеку рекомендуется в сочетании с TypeScript, библиотека содержит файлы декларации типов.

##### Конфигурация

Для использования в dev среде первым делом необходимо объявить конфигурацию dev среды.
В примере конфигурация будет объявлять отдельным файлом, разместить его можно либо в папке проекта.
Вы можете объявить конфигурацию в любом удобном для вас месте (хоть прямо в функции).

Пример файла:

```ts
import DevConfig from "nsd_js_api_proxy/dist/model/DevConfig";

const devConfig : DevConfig = {
    scheme: "https",
    host: "my.sd.ru",
    accessKey: "cd13e55640-2bewrg77-420c-83fab-2355dfgfea2a6f8",
    subjectUuid: "serviceCall$65711710",
    appCode: "someAppCode",
    isAddForm: false,
    isEditForm: true,
    isOnObjectCard: false,
    currentUserUuid: "employee$123123123",
    currentLocale: "ru",
    viewMode: "normal",
    currentContentParameters : {
    "test" : "test1",
        "number1" : 1
    },
    objectDialogSelectionResult : {
        "classFqnpresentAttributesGroupCode" : "1231231"
    },
    appInitialHeight : 123,
    formValues : {
	    source : "123"
    },
    changeResponsibleResult : {responsible : ["empl1", "team2"]}
}

export default devConfig
```

Описание параметров конфигурации:

| Ключ                        | Описание                                                                                                                                                                                                                                                                                                                                                                                                                 | Типы                   | Обязательно |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ----------- |
| scheme                      | схема, по которой прокси будет обращаться к NSD в dev режиме, используется для обращений к инсталляции по rest                                                                                                                                                                                                                                                                                                           | string                 | Да          |
| host                        | хост NSD, используется для обращений к инсталляции по rest                                                                                                                                                                                                                                                                                                                                                               | string                 | Да          |
| accessKey                   | ключ доступа к инсталляции, используется для обращений к инсталляции по rest                                                                                                                                                                                                                                                                                                                                             | string                 | Да          |
| subjectUuid                 | плейсхолдер UUID объекта в dev среде, на карточке которого как будто бы размещено встроенное приложение, возвращаемый методом extractSubjectUuid()                                                                                                                                                                                                                                                                       | string \| null         | Нет         |
| appCode                     | плейсхолдер кода встроенного приложени в dev среде, возвращаемый методом findApplicationCode()                                                                                                                                                                                                                                                                                                                           | string \| null         | Нет         |
| isAddForm                   | признак нахождения ВП на форме добавления для dev среды, возвращаемый методом isAddForm()                                                                                                                                                                                                                                                                                                                                | boolean                | Нет         |
| isEditForm                  | признак нахождения ВП на форме редактирования для dev среды, возвращаемый методом isEditForm()                                                                                                                                                                                                                                                                                                                           | boolean                | Нет         |
| isOnObjectCard              | признак нахождения ВП на карточке объекта для dev среды, возвращаемый методом isOnObjectCard()                                                                                                                                                                                                                                                                                                                           | boolean                | Нет         |
| currentUserUuid             | плейсхолдер UUID текущего пользователя в dev среде, возвращаемый методом getCurrentUser()                                                                                                                                                                                                                                                                                                                                | string \| null         | Нет         |
| currentLocale               | плейсхолдер кода текущей локализации, возвращается методом getCurrentLocale()                                                                                                                                                                                                                                                                                                                                            | string                 | Нет         |
| viewMode                    | плейсхолдер текущего режима отображения ВП, возврается методом getViewMode()                                                                                                                                                                                                                                                                                                                                             | string                 | Нет         |
| objectDialogSelectionResult | плейсхолдеры выбранного объекта, возвращаемых методом commands.selectObjectDialog(classFqn: string, presentAttributesGroupCode: string). В параметр нужно поместить словарь, в ключах которого будут сочетания classFqn и presentAttributesGroupCode (просто конкатенация в указанном порядке), в значениях должны быть указаны значения, которые должны быть возвращены при вызове метода commands.selectObjectDialog() | Record<string, string> | Нет         |
| currentContentParameters    | плейсхолдер параметров на контенте, где на текущий момент размещено приложение, вовзращается методом contents.getParameters()                                                                                                                                                                                                                                                                                            | Record<string, string> | Нет         |
| appInitialHeight            | плейсхолдер изначальной высоты приложения, возвращается методом  contents.getInitialHeight()                                                                                                                                                                                                                                                                                                                             | number                 | Нет         |
| changeResponsibleResult     | плейсхолдер результата сохранения формы из метода forms.changeResponsible()                                                                                                                                                                                                                                                                                                                                              |                        |             |
| formValues                  | плейсхолдер значений на форме из метода forms.getValues()                                                                                                                                                                                                                                                                                                                                                                |                        |             |

##### Код

Далее вам необходимо получить экземпляр объекта JsProxyApi, для этого вызовите статический метод getInstance класса JsApiProxy, передав в него ранее описанную конфигурацию.

```ts
import JsApiProxy from "nsd_js_api_proxy/dist/JsApiProxy"
import devConfig from "../js-api-dev-config";

const apiProxy: JsApiProxy = JsApiProxy.getInstance(devConfig)
const viewMode: string = apiProxy.getViewMode()
```

Библиотека имеет типизированную обертку для объекта-параметра, который используется как аргумент в методах обращения по
REST:

```ts
import JsApiProxy from "nsd_js_api_proxy/dist/JsApiProxy"
import RestCallOptions from "nsd_js_api_proxy/dist/model/RestCallOptions";
import HttpMethod from "nsd_js_api_proxy/dist/model/HttpMethod";
import ResponseType from "nsd_js_api_proxy/dist/model/ResponseType";

const apiProxy: JsApiProxy = JsApiProxy.getInstance()
const someUrl: string = "find/serviceCall$serviceCall"
const restOptions: RestCallOptions = {
    method: HttpMethod.GET,
    headers: {'someHeader': "someValue"},
    responseType: ResponseType.JSON,
    body: {"key": "value"}
}
const serverResponse: any = apiProxy.restCall(someUrl, restOption)
```

При запуске приложения в консоли отобразится информация о обнаруженном библиотекой окружении, в том числе информации
найден ли файл конфигурации и откуда он найден:

~~~
nsd js api proxy: 
devMode: true
devConfigFound: true (from project dir)
host: pss.test.ocs.ru
~~~



