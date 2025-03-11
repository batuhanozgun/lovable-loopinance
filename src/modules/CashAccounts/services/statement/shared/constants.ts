
/**
 * Statement servislerinde kullanılan sabitler
 */
import { StatementStatus } from '../../../types';

export const STATEMENT_STATUSES = {
  OPEN: StatementStatus.OPEN,
  CLOSED: StatementStatus.CLOSED,
  PENDING: StatementStatus.PENDING,
  FUTURE: StatementStatus.FUTURE,
};
