import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Req } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { response } from 'express';
import { request } from 'http';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @Post()
  async createHistory(@Res() response,@Body() createHistoryDto: CreateHistoryDto) {
    try {
      const newHistory = await this.historyService.createHistory(createHistoryDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'History has been created successfully',
        newHistory,
      })
    } catch (error : any) {
      return response.status(HttpStatus.BAD_REQUEST).json(
        {
          statusCode: 400,
          message: 'Error: History is not Genrated!',
          error: 'Bad Request',
        },
        response.error
      );
      console.log('Error ==  ' , error.message);
      
    }
  }

  @Get()
  async findAllHistories(@Res() response) {
    try {
      const allHistoriesData = await this.historyService.getAllHitories();
      return response.status(HttpStatus.OK).json({
        message: 'All Historiese data found successfully',
        allHistoriesData,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json({ Mesage: 'Error in Fetching All Historiese' }, error.response);
    }
  }

  @Get('/:id')
  async findOne(@Res() response, @Param('id') historyId: number) {
    try {
      const fetchedHistory = await this.historyService.getHistory(historyId);
      return response.status(HttpStatus.OK).json({
        message: 'History found successfully',
        fetchedHistory,
      });
    } catch (error) {
      return response
        .status(error.status)
        .json(
          { Mesage: 'Error in Fetching this Particular History' },
          error.response,
        );
    }

  }

}
