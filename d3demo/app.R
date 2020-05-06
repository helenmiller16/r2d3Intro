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
            selectInput("yaxis", label = "y axis", choices = names(mtcars))
        ),

        mainPanel(
           d3Output("d3Plot"),
           textOutput("carOutput")
        )
    )
)

# Define server logic required to draw a histogram
server <- function(input, output) {
    
    output$d3Plot <- renderD3({
        
        data <- mtcars
        data$model <- rownames(mtcars)
        data$x <- mtcars[, input$xaxis,]
        data$y <- mtcars[, input$yaxis,]
    
        r2d3(data, "mtcarsShiny.js")
    })
    
    output$carOutput <- renderText(req(input$carInput))
}

# Run the application 
shinyApp(ui = ui, server = server)
