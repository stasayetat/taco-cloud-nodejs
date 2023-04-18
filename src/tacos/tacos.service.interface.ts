export interface ITacosService {
	createTaco: (taco: Object) => Promise<object>;
	findTaco: (id?: number, name?: string) => Promise<object>;
}