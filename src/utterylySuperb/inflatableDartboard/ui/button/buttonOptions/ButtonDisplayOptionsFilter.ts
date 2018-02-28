namespace utterlySuperb.inflatableDartboard.ui.button{
    import Filter = PIXI.Filter;
    export interface ButtonDisplayOptionsFilter extends ButtonDisplayOptions{
        overFilter?:Filter<{}>;
        downFilter?:Filter<{}>;
        disableFilter?:Filter<{}>;
        selectedFilter?:Filter<{}>;
    }
}