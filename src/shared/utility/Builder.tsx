import { ReactElement } from 'react';
import { PulseLoader } from 'react-spinners';

export type BuilderStatus = 'success' | 'error' | 'loading' | 'idle';

class Builder {
  private readonly _status: BuilderStatus = 'loading';

  success: ReactElement = (<></>);
  error: ReactElement = (<></>);
  idle: ReactElement = (<></>);
  loading: ReactElement = (
    <PulseLoader
      color="orange"
      style={{ margin: 'auto', borderColor: 'orange', padding: '10px' }}
    />
  );

  constructor(status: BuilderStatus) {
    this._status = status;
  }

  static createResult(status: BuilderStatus) {
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
