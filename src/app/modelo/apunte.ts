import {Asignatura} from './asignatura';
import {TipoApunte} from './tipo-apunte';

export class Apunte {
  id:number;
  name:string;
  subject: Asignatura;
  classNoteType: TipoApunte;
  size: number;
  updateTime: Date;
  classNoteTime: Date;
  valid: boolean;
  filePath: string;
}
