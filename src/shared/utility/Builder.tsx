import { ReactElement } from 'react';
import Spinner from '@components/primitives/spinner/Spinner';
import { DataStatus } from '@shared/types/Other';

class Builder {
  private readonly _status: DataStatus = 'loading';

  success: ReactElement = (<></>);
  error: ReactElement = (<></>);
  idle: ReactElement = (<></>);
  loading: ReactElement = (<Spinner />);

  constructor(status: DataStatus) {
    this._status = status;
  }

  static createResult(status: DataStatus) {
    if (!status || !status.length)
      throw new Error(
        "Status must be defined. Possible values: 'success', 'loading', 'idle', 'error'. Any other value will be treated as 'error'."
      );
    return new Builder(status);
  }

  onSuccess(result: ReactElement) {
    this.success = result;
    return this;
  }

  onError(result: ReactElement) {
    this.error = result;
    return this;
  }

  onIdle(result: ReactElement) {
    this.idle = result;
    return this;
  }

  onLoading(result: ReactElement) {
    this.loading = result;
    return this;
  }

  build(): ReactElement {
    switch (this._status) {
      case 'success':
        return this.success;
      case 'loading':
        return this.loading;
      case 'idle':
        return this.idle;
      default:
        return this.error;
    }
  }
}

export default Builder;
