//tengo la impresion de que este codigo es innecesario, pero por ahora se queda aqui
export default class Wave{
	constructor(number){
        //asignamos el numero de la oleada
        this.number = number;

        this.totalWaves = 3; //para saber is hemos completado todas las oleadas


        //cantidad de cada tipo de enemigo por oleada
        if(number == 1){
            this.numGladiadores1 = 0;
            this.numGuerreros1 = 0;
            this.numLancers1 = 1;
        }
        else if(number == 2){
            this.numGladiadores1 = 0;
            this.numGuerreros1 = 0;
            this.numLancers1 = 1;
        }
        else if(number == 3){
            this.numGladiadores1 = 0;
            this.numGuerreros1 = 0;
            this.numLancers1 = 1;
        }
        
    }
}