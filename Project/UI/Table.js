KISSY.add("UI/Table",function(S,Line){
    return function(){
        var Table = {};
        Table.Lines = [];
        var LineCount = 0;
        Table.AddLine = function(Line){
            Table.Lines.push(Line);
            return Line;
        }
        Table.Line = Line;
        Table.SetBorderSize = function(){
            for(var i = 0 ; i < Table.Lines.length ; i++){
                Table.Lines[i].SetBorderSize();
            }
        }
        return Table;
    }
},{
	requires: ["UI/Table/Line","UI/Table/Table.css"]
})
KISSY.add("UI/Table/Line",function(S){
    return function(LineCfg){
        var Cell = function(CellCfg){
            var CellObj = {};
            var CellDCfg = {
                Width: 100,
                Height: 24,
                SubCell: null,
                Name: null,
                Index: null,
                Text: null,
                Rander: LineElement,
                ClassName: null
            };
            S.mix(CellDCfg,CellCfg);
            
            var SetCell = function(){
                if(LineDCfg.ClassName != null && typeof(LineDCfg.ClassName) == "string"){
                    CellElement.addClass(LineDCfg.ClassName);
                }
                if(CellDCfg.ClassName != null && typeof(CellDCfg.ClassName) == "string"){
                    CellElement.addClass(CellDCfg.ClassName);
                }
                if(CellDCfg.Rander.hasClass("SubCell")){
                    if(CellDCfg.Index==0){
                        CellElement.addClass("First");
                    }
                }else{
                    CellDCfg.Index = Line.Cells.length + 1;
                }                
            }
            var SetName = function(){
                if(CellDCfg.Name!=null && (typeof(CellDCfg.Name) == "string" || typeof(CellDCfg.Name) == "number")){
                    CellElement.attr("name",CellDCfg.Name);
                }else{
                    CellDCfg.Name = CellDCfg.Index;
                    SetName();
                }
            }
            var SetText = function(){
                if(CellDCfg.Text!=null && typeof(CellDCfg.Text) == "string"){
                    TextElement.text(CellDCfg.Text);
                }else{
                    CellDCfg.Text = "";
                    SetText();
                }
            }
            var SetSubCell = function(){
                if(CellDCfg.SubCell != null && S.isArray(CellDCfg.SubCell)){
                    var Rander = S.one(document.createElement("div")).addClass("SubCell").addClass("clearfix");
                    for(var i=0 ;i<CellDCfg.SubCell.length;i++){
                        CellDCfg.SubCell[i].Rander = Rander;
                        CellDCfg.SubCell[i].Index = i;
                        CellDCfg.SubCell[i] = new Cell(CellDCfg.SubCell[i]);
                    }
                    CellElement.append(Rander);
                }
                
            }
            var SetSize = function(){
                if(CellDCfg.SubCell == null){
                    CellElement.css({"width": CellDCfg.Width + "px","height": CellDCfg.Height + "px"});                    
                }   
                TextElement.css({"height": CellDCfg.Height + "px","line-height": CellDCfg.Height + "px"});             
            }
            var SetSubBorderSize = function(){
                if(CellDCfg.SubCell != null && S.isArray(CellDCfg.SubCell)){
                    var MaxCellHeight = 0;
                    for(var i=0;i<CellDCfg.SubCell.length;i++){
                        var SubCellElement = CellDCfg.SubCell[i].GetCellElement();
                        var SubCellElementHeight = SubCellElement.outerHeight();
                        if(SubCellElementHeight>MaxCellHeight){
                            MaxCellHeight = SubCellElementHeight;
                        }          
                    }
                    for(var i=0;i<CellDCfg.SubCell.length;i++){
                        var SubCellElement = CellDCfg.SubCell[i].GetCellElement();
                        var SubTextElement = CellDCfg.SubCell[i].GetTextElement();                        
                        SubCellElement.css({"height": MaxCellHeight + "px"});
                        if(!CellDCfg.SubCell[i].HasSubCell()){
                            SubTextElement.css({"height": MaxCellHeight + "px","line-height": MaxCellHeight + "px"});
                        }
                    }
                }
            }
            CellObj.GetCellElement = function(){
                return CellElement;
            }
            CellObj.GetTextElement = function(){
                return TextElement;
            }
            CellObj.HasSubCell = function(){
                return CellDCfg.SubCell != null && S.isArray(CellDCfg.SubCell);
            }
            var CellElement = S.one(document.createElement("div")).addClass("Cell");
            var TextElement = S.one(document.createElement("span")).addClass("Text");
            CellDCfg.Rander.append(CellElement.append(TextElement));         
            SetCell();
            SetName();
            SetText();
            SetSubCell();
            SetSize();
            SetSubBorderSize();    
            return CellObj;
        }
        var Line = {};
        var LineDCfg = {
            Cell: [],
            ClassName: null,
            Rander: S.one("body"),
            CellCfg: []      
        };
        S.mix(LineDCfg,LineCfg);
        
        var LineElement = S.one(document.createElement("div")).addClass("Line").addClass("clearfix");
        if(LineDCfg.ClassName != null && typeof(LineDCfg.ClassName) == "string"){
            LineElement.addClass(LineDCfg.ClassName);
        }
        LineDCfg.Rander.append(LineElement);
        
        var SetBorderSize = function(){
            var MaxCellHeight = 0;
            var LineWidth = 0;
            for(var i=0;i<Line.Cells.length;i++){
                var CellElement = Line.Cells[i].GetCellElement();
                var CellElementHeight = CellElement.outerHeight();
                var CellElementWidth = CellElement.outerWidth();
                if(CellElementHeight>MaxCellHeight){
                    MaxCellHeight = CellElementHeight;
                }
                if(!CellElement.hasClass("Hide")){
                    LineWidth += CellElementWidth;
                }
                              
            }
            for(var i=0;i<Line.Cells.length;i++){
                var CellElement = Line.Cells[i].GetCellElement();
                var TextElement = Line.Cells[i].GetTextElement();
                CellElement.css({"height": MaxCellHeight + "px"});
                if(!Line.Cells[i].HasSubCell()){
                    TextElement.css({"height": MaxCellHeight + "px","line-height": MaxCellHeight + "px"});
                }
            }
            LineElement.css({"width": LineWidth + "px"});    
        }
        
        Line.Cells = [];

        Line.AddCell = function(CellCfg){
            var NewCell = new Cell(CellCfg);
            Line.Cells.push(NewCell);
            return NewCell;
        }
        Line.AddCells = function(CellCfgs){
            if(S.isArray(CellCfgs)){
                for(var i = 0 ; i < CellCfgs.length ; i++){
                    if(LineDCfg.CellCfg[i]){
                        S.mix(CellCfgs[i],LineDCfg.CellCfg[i]);
                    }
                    Line.AddCell(CellCfgs[i]);
                }
            }
            SetBorderSize();
        }
        Line.SetBorderSize = function(){
            SetBorderSize();
        }
        if(LineDCfg.Cell != null && S.isArray(LineDCfg.Cell)){
            Line.AddCells(LineDCfg.Cell);
        }        
        return Line;
    };
    
})