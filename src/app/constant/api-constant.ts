import {API} from '../models/api.interface';
import {PortalType} from './portal-type.enum';

export class ApiConstant {
  public static API_NON_AUTH_LOGIN: API = {
    module: PortalType.NON_AUTH,
    uri: 'login'
  };
  public static API_NON_AUTH_LOGOUT: API = {
    module: PortalType.NON_AUTH,
    uri: 'logout'
  };
  public static API_CHECK_ROLE: API = {
    module: PortalType.NON_AUTH,
    uri: 'has-role?key={key}'
  };
}
