<?php

namespace App\Rest\Controllers;

use App\Rest\Resources\TicketResource;
use Lomkit\Rest\Http\Resource;

final class TicketController extends Controller
{
    /**
     * The resource the controller corresponds to.
     *
     * @var class-string<\Lomkit\Rest\Http\Resource>
     */
    public static $resource = TicketResource::class;
}
