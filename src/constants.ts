const LINKEDIN_LOGIN_PAGE_URL = 'https://www.linkedin.com/login';
const LINKEDIN_FEED_PAGE_URL = 'https://www.linkedin.com/feed';
const LOGIN_EMAIL_FIELD_SELECTOR = '#username';
const LOGIN_PASS_FIELD_SELECTOR = '#password';
const LOGIN_SUBMIT_BUTTON_SELECTOR =
  "button[data-litms-control-urn='login-submit']";
const LOGIN_SUBMIT_BUTTON_CLICK_TIMEOUT = 1500;
const LOGIN_SUBMIT_WAITING_TIME = 1000;

const stateBoxDefaultValue = {
  title: 'Idle',
  meta: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Blanco_landscape.svg',
    title: '',
    description: '',
  },
};

export {
  LINKEDIN_LOGIN_PAGE_URL,
  LINKEDIN_FEED_PAGE_URL,
  LOGIN_EMAIL_FIELD_SELECTOR,
  LOGIN_PASS_FIELD_SELECTOR,
  LOGIN_SUBMIT_BUTTON_SELECTOR,
  LOGIN_SUBMIT_BUTTON_CLICK_TIMEOUT,
  LOGIN_SUBMIT_WAITING_TIME,
  stateBoxDefaultValue,
};
