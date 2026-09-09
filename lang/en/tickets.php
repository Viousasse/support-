<?php

return [
    'exceptions' => [
        'invalid_status_transition' => 'This ticket status transition is not allowed.',
    ],

    'notifications' => [
        'assigned' => [
            'subject' => 'A ticket has been assigned to you',
            'introduction' => 'A ticket has been assigned to you.',
            'ticket_title' => 'Title: :title',
            'action' => 'View ticket',
        ],
    ],
];