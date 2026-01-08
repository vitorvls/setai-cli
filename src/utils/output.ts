import chalk from 'chalk';
import { tMessage } from './i18n.js';

/**
 * Utilitários para output no terminal
 * Usa console.log mas de forma centralizada para evitar warnings do ESLint
 * Suporta tradução automática de mensagens
 */

export function info(message: string, useTranslation: boolean = false): void {
  // eslint-disable-next-line no-console
  console.log(chalk.blue(useTranslation ? tMessage(message) : message));
}

export function success(message: string, useTranslation: boolean = false): void {
  // eslint-disable-next-line no-console
  console.log(chalk.green(useTranslation ? tMessage(message) : message));
}

export function error(message: string, useTranslation: boolean = false): void {
  // eslint-disable-next-line no-console
  console.error(chalk.red(useTranslation ? tMessage(message) : message));
}

export function warning(message: string, useTranslation: boolean = false): void {
  // eslint-disable-next-line no-console
  console.log(chalk.yellow(useTranslation ? tMessage(message) : message));
}

export function gray(message: string, useTranslation: boolean = false): void {
  // eslint-disable-next-line no-console
  console.log(chalk.gray(useTranslation ? tMessage(message) : message));
}
