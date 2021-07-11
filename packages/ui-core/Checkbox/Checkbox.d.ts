import * as React from 'react'

export interface CheckboxProps {
  /**
  * Выбранное состояние
  */
  checked?: true | false | 'true' | 'false';
//  /**
//   * Иконка в выбранном состоянии
//   */
//  checkedIcon: React.ReactNode;
 /**
  * Кастомные классы для изменения позиции или цвета компонента
  */
 className?: string;
  /**
  * Состояние ошибки
  */
  error?: boolean;
 /**
  * Заблокированное состояние
  */
 disabled?: boolean;
//  /**
//   * If `true`, the ripple effect will be disabled.
//   */
//  disableRipple?: boolean;
//  /**
//   * Иконка в невыбранном состоянии
//   */
//  icon: React.ReactNode;
 /**
  * Идентификатор элемента
  */
 id?: string;
 /**
  * Состояние неопределенности
  */
 indeterminate?: boolean;
 /**
  * Поле обязательно для выбора
  */
 required?: boolean;
//  /**
//   * Иконка в неопределенном состоянии
//   */
//  indeterminateIcon: React.ReactNode;
//  /**
//   * Свойства `input` элемента
//   */
//  inputProps: PropTypes.object;
//  /**
//   * Ссылка на нативный компонент Dom
//   */
//  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]);
//  /**
//   * Обратный вызов после изменения значения элемента
//   *
//   * @param {object} event The event source of the callback.
//   * You can pull out the new value by accessing `event.target.checked`.
//   * @param {boolean} checked The `checked` value of the switch
//   */
//  onChange: PropTypes.func;
 /**
  * Значение поля
  */
 value?: string;
}

declare const Checkbox: React.FunctionComponent<CheckboxProps>

export default Checkbox
