//tengo la impresion de que este codigo es innecesario, pero por ahora se queda aqui
export default class Wave{
	constructor(number){
        //asignamos el numero de la oleada
        this.number = number;
        //cantidad de cada tipo de enemigo por oleada
        if(number == 1){
            this.numGladiadores1 = 1;
            this.numGuerreros1 = 1;
            this.numLancers1 = 1;
        }
        else if(number == 2){
            this.numGladiadores1 = 3;
            this.numGuerreros1 = 3;
            this.numLancers1 = 1;
        }
        else if(number == 3){
            this.numGladiadores1 = 2;
            this.numGuerreros1 = 2;
            this.numLancers1 = 2;
        }
        
    }
}