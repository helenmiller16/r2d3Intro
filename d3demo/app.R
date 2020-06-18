#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
library(r2d3)

ui <- fluidPage(

    titlePanel("d3 Demo"),

    sidebarLayout(
        sidebarPanel(
            selectInput("xaxis", label = "x axis", choices = names(mtcars)),
            selectInput("yaxis", label = "y axis", choices = names(mtcars), selected = "hp")
        ),

        mainPanel(
           d3Output("d3Plot"),
           textOutput("selectedModel")
        )
    )
)

# Define server logic required to draw a histogram
server <- function(input, output) {
    
    output$d3Plot <- renderD3({
        
        data <- mtcars
        data$model <- rownames(mtcars)
    
        r2d3(data, "mtcarsShiny.js", options=list(x = input$xaxis, y = input$yaxis))
    })
    
    output$selectedModel <- renderText(req(input$selectedModel))
}

# Run the application 
shinyApp(ui = ui, server = server)
