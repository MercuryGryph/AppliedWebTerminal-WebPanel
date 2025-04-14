/**
 * CPU 不可用
 */
interface UnsuitableCpuError {
  offline: boolean;
  busy: boolean;
  tooSmall: boolean;
  excluded: boolean;
}

export default UnsuitableCpuError;
