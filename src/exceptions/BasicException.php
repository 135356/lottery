<?php

namespace Lonban\Lottery\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BasicException extends Exception
{
    public function render($request, Exception $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'error' => 'Resource not found.'
            ],404);
        }
        return parent::render($request, $exception);
    }
}