class GamesController < ApplicationController
    def index
        @games = Game.all
        render json:
    end
end
