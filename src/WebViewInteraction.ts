import { ILIProfile } from './api/types';
import {
  LINKEDIN_LOGIN_PAGE_URL,
  LOGIN_SUBMIT_BUTTON_SELECTOR,
} from './constants';

import Electron, { remote, WebContents, webContents } from 'electron';
import { SetterOrUpdater } from 'recoil';
import { CustomError } from './CustomError';
import { SNCollecting } from './types/SNCollecting';
// const SEARCH_PEOPLE_RX = new RegExp(
//   api.DOMAIN_PRX + '/search/results/people',
//   'i'
// );
// const SEARCH_ALL_RX = new RegExp(api.DOMAIN_PRX + '/search/results/all/', 'i');
// const SN_SEARCH_PEOPLE_RX = new RegExp(
//   api.DOMAIN_PRX + '/sales/search/people',
//   'i'
// );
// const R_SEARCH_PEOPLE_RX = /http(?:s)?\:\/\/(?:www\.)?linkedin\.com\/recruiter\/smartsearch/i;
// const MY_NETWORK_RX = new RegExp(
//   api.DOMAIN_PRX + '/mynetwork/invite-connect/connections',
//   'i'
// );
// const GROUP_RX = new RegExp(
//   api.DOMAIN_PRX + '/groups/([^/&#]+)/(?=members|manage/membership/members)/?',
//   'i'
// );
// const ALUMNI_RX = new RegExp(api.DOMAIN_PRX + '/school/([^/&#]+)/people', 'i');
// const VIEWED_MY_PROFILE_RX = /http(?:s)?\:\/\/(?:www\.)?linkedin\.com\/me\/(?:profile-views\/urn\:li\:wvmp\:summary|no-profile-views)\/?$/i;
// const SN_LIST_PEOPLE_RX = /\/sales\/lists\/people\/([^/&#?]+)\?/i;
// const SN_SEARCH_ORGANIZATIONS_RX = /http(?:s)?\:\/\/(?:www\.)?linkedin\.com\/sales\/search\/company/i;
// const SN_ORGANIZATIONS_LISTS_RX = /http(?:s)?\:\/\/(?:www\.)?linkedin\.com\/sales\/lists\/company/i;
// const SENT_INVITATION_RX = /http(?:s)?\:\/\/(?:www\.)?linkedin\.com\/mynetwork\/invitation-manager\/sent/i;
// const R_PROJECT_RX = /http(?:s)?\:\/\/(?:www\.)?linkedin\.com\/recruiter\/projects\/[0-9]+\?projectId=[0-9]+/i;
// const T_SEARCH_PEOPLE_RX = /http(?:s)?\:\/\/(?:www\.)?linkedin\.com\/talent\/(?:search|hire.*recruiterSearch)/i;
// const T_PROJECT_RX = /http(?:s)?\:\/\/(?:www\.)?linkedin\.com\/talent\/hire\/\d+\/(?:discover\/automatedSourcing\/review\/list|manage\/all)/i;
// const SEARCH_PEOPLE_URL =
// 'https://www.linkedin.com/search/results/people/?facetNetwork=%5B%22F%22%2C%22S%22%5D&origin=FACETED_SEARCH';
const SN_SEARCH_PEOPLE_URL = 'https://www.linkedin.com/sales/search/people';
const SN_SEARCH_NEXT_BTN_SELECTOR = `document.getElementsByClassName('search-results__pagination-next-button')[0]`;
const SN_SEARCH_PREVIOUS_BTN_SELECTOR = `document.getElementsByClassName('search-results__pagination-previous-button')[0]`;
// const R_SEARCH_PEOPLE_URL = 'https://www.linkedin.com/recruiter/smartsearch';
// const MY_NETWORK_URL =
//   'https://www.linkedin.com/mynetwork/invite-connect/connections';
// const GROUP_URL = 'https://www.linkedin.com/groups/my-groups';
// const ALUMNI_URL = 'https://www.linkedin.com/school/harvard-university/people';
// const VIEWED_MY_PROFILE_URL = 'https://www.linkedin.com/me/profile-views';
// const SN_LIST_OF_PEOPLE_LISTS_URL =
//   'https://www.linkedin.com/sales/lists/people';
// const SN_SEARCH_ORGANIZATIONS_URL =
//   'https://www.linkedin.com/sales/search/company';
// const SN_ORGANIZATIONS_LISTS_URL =
//   'https://www.linkedin.com/sales/lists/company';
// const SENT_INVITATION_URL =
//   'https://www.linkedin.com/mynetwork/invitation-manager/sent/';
// const R_PROJECT_URL = 'https://www.linkedin.com/recruiter/hiring-dashboard';
// const SEARCH_ORGANIZATIONS_URL =
//   'https://www.linkedin.com/search/results/companies';
// const T_SEARCH_PEOPLE_URL = 'https://www.linkedin.com/talent/home';
// const T_PROJECT_URL = 'https://www.linkedin.com/talent/home';

type collectingSource = 'SN_SEARCH_PEOPLE_URL';

class WebViewInteraction {
  private readonly _webView: Electron.WebviewTag;
  private readonly _profile: ILIProfile;
  private readonly _webContents: WebContents;
  private readonly _debugger: Electron.Debugger;
  private _setState: SetterOrUpdater<string>;
  state: string;
  loggedIn: boolean;
  setAction: SetterOrUpdater<string>;

  constructor(
    webView: Electron.WebviewTag,
    profile: ILIProfile,
    setState: SetterOrUpdater<string>,
    setAction: SetterOrUpdater<string>
  ) {
    this._webView = webView;
    this._webContents = remote.webContents.fromId(webView.getWebContentsId());
    this._profile = profile;
    this._debugger = this._webContents.debugger;
    this.state = 'Idle';
    this.loggedIn = false;
    this._setState = setState;
    this.setAction = setAction;
  }

  public setState(newState: string) {
    this._setState(newState);
    this.state = newState;
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private randomSleep(min: number, max: number) {
    return this.sleep(Math.floor(Math.random() * (max - min + 1) + min));
  }

  private sendMessage(channel: string, ...args: any) {
    this._webView.send(channel, ...args);
  }

  private fnToExecutable(fn: Function, ...args: any) {
    const entire = fn.toString();

    const functionName = entire.slice(
      entire.indexOf('function') + 8,
      entire.indexOf('(')
    );

    const functionArgsAsStrings = args.map(JSON.stringify).join(',') || '';

    return `${entire}; \n${functionName}(${functionArgsAsStrings});`;
  }

  private async runJavascriptFunction(fn: Function) {
    return await this._webView.executeJavaScript(this.fnToExecutable(fn));
  }

  private runJavascript(code: string) {
    try {
      return this._webView.executeJavaScript(code);
    } catch (err) {}
    return null;
  }

  private simulateClick(x: number, y: number) {
    this._webView.sendInputEvent({ type: 'mouseDown', x: x + 5, y: y + 2 });
  }

  private sendKeystroke(keycode: string) {
    this._webView.sendInputEvent({ type: 'char', keyCode: keycode });
  }

  private async navigateToURL(url: string) {
    try {
      if (this._webView.getURL() !== url) await this._webView.loadURL(url);
      if (!this._webView.getURL().includes(url)) return;
    } catch (err) {}
  }

  private async simulateTyping(text: string) {
    for (let char of text) {
      if (/\r|\n/.test(char)) {
        this.sendKeystroke('Shift+Enter');
        await this.randomSleep(700, 2000);
        continue;
      }
      this.sendKeystroke(char);
      await this.randomSleep(25, 200);
    }
  }

  private loginClient() {
    const emailField = document.querySelector('#username');
    const passField = document.querySelector('#password');

    let { x: emailX, y: emailY } = emailField!.getBoundingClientRect();
    let { x: passX, y: passY } = passField!.getBoundingClientRect();

    return [
      { x: emailX, y: emailY },
      { x: passX, y: passY },
    ];
  }

  @ChangeState('Logging In', 'Idle')
  public async login() {
    await this.navigateToURL(LINKEDIN_LOGIN_PAGE_URL);

    const [emailCoordinates, passwordCoordinates] =
      (await this.runJavascriptFunction(this.loginClient)) as coordinates[];

    this.simulateClick(emailCoordinates.x, emailCoordinates.y);
    await this.simulateTyping(this._profile.email);

    await this.randomSleep(400, 3000);

    this.simulateClick(passwordCoordinates.x, passwordCoordinates.y);
    await this.simulateTyping(this._profile.password);

    await this.randomSleep(300, 800);

    this.runJavascript(
      `document.querySelector("${LOGIN_SUBMIT_BUTTON_SELECTOR}").click()`
    );

    this.loggedIn = true;
  }

  public getCurrentCollectingPage(url: string): collectingSource | undefined {
    if (url.includes(SN_SEARCH_PEOPLE_URL)) return 'SN_SEARCH_PEOPLE_URL';
    return;
  }

  @StateGuard('Idle')
  public startCollecting(source: collectingSource, queueId: number) {
    if (source == 'SN_SEARCH_PEOPLE_URL') this.SNCollecting(queueId);
    return;
  }

  @ChangeState('Collecting', 'Idle')
  public async SNCollecting(queueId: number) {
    // this._webView.
    let pages = 0;
    let totalUsers = 0;
    let collected = 0;
    let skipped = 0;
    const requests = new Set();
    let currentRequest: SNCollecting | undefined;
    let length = 0;
    console.log(this.state);
    try {
      this._debugger.attach('1.3');
    } catch (err) {
      console.log('Debugger attach failed: ', err);
    }

    const onDetach = (_event: any, reason: any) => {
      console.log('Debugger detached due to: ', reason);
    };

    const onMessage = async (_event: any, method: any, params: any) => {
      if (method === 'Network.requestWillBeSent') {
        const { requestId, request } = params;
        if (request.url.indexOf('sales-api/salesApiPeopleSearch') != -1) {
          console.log(`REQ [${requestId}] ${request.method} ${request.url} \n`);
          requests.add(requestId);
        }
      }

      if (method === 'Network.loadingFinished') {
        const { requestId } = params;
        if (requests.has(requestId)) {
          length++;
          const { body }: { body: string } = await this._debugger.sendCommand(
            'Network.getResponseBody',
            {
              requestId,
            }
          );
          currentRequest = JSON.parse(body) as SNCollecting;
        }
      }
    };

    this._debugger.on('detach', onDetach);
    this._debugger.on('message', onMessage);
    this._debugger.sendCommand('Network.enable');

    //Going next and then back so the request is captured by the event
    await this.runJavascript(`${SN_SEARCH_NEXT_BTN_SELECTOR}.click()`);
    await this.runJavascript(`${SN_SEARCH_PREVIOUS_BTN_SELECTOR}.click()`);
    while (this.state === 'Collecting') {
      await this.sleep(7 * 1000);
      for (let retries = 5; retries > 0; retries--) {
        if (length == requests.size) break;

        await this.sleep(1000 * (5 + (5 - retries)));
      }

      //Saving the collected users and updating the state box
      if (currentRequest) {
        console.log(currentRequest.metadata);
        const { paging, elements } = currentRequest;
        const possiblePages = Math.floor(paging.total / 25);
        pages = possiblePages < 100 ? possiblePages : 100;
        totalUsers = paging.total;
        collected += elements.length;
      }

      //Trying to click on the next page button
      try {
        if (
          !(await this.runJavascript(`!!${SN_SEARCH_NEXT_BTN_SELECTOR}`)) ||
          (await this.runJavascript(
            `!!${SN_SEARCH_NEXT_BTN_SELECTOR}.disabled`
          ))
        )
          throw new Error('No Button');
        this.runJavascript(`${SN_SEARCH_NEXT_BTN_SELECTOR}.click()`);
      } catch (err) {
        console.log(err);
        break;
      }
    }
    this._debugger.off('detach', onDetach);
    this._debugger.off('message', onMessage);
    this._debugger.detach();
  }
}

function StateGuard(requiredState: string): MethodDecorator {
  return function (
    _: Object,
    __: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor | void {
    let original: Function = descriptor.value;

    descriptor.value = async function (
      this: WebViewInteraction,
      ...args: any[]
    ) {
      if (requiredState === this.state) return await original.apply(this, args);
      return new StateError(requiredState, this.state);
    };
  };
}

function ChangeState(start: string, end: string): MethodDecorator {
  console.log('SetState(): evaluated');
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor | void {
    let original: Function = descriptor.value;

    console.log(target, descriptor);

    descriptor.value = async function (
      this: WebViewInteraction,
      ...args: any[]
    ) {
      this.setState(start);
      console.log(this.state);
      const result = await original.apply(this, args);
      this.setState(end);
      return result;
    };
  };
}

class StateError extends CustomError {
  public constructor(public requiredState: string, public actualState: string) {
    super(`State of app must be ${requiredState}, but is ${actualState}`);
  }
}

type coordinates = {
  x: number;
  y: number;
};

export { WebViewInteraction, StateError };
