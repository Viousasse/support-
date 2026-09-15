<?php

return [
    'status' => [
        'open' => 'Open',
        'assigned' => 'Assigned',
        'in_progress' => 'In progress',
        'resolved' => 'Resolved',
        'closed' => 'Closed',
    ],

    'priority' => [
        'low' => 'Low',
        'normal' => 'Normal',
        'high' => 'High',
        'critical' => 'Critical',
    ],

    'list' => [
        'heading' => 'Tickets',
        'empty' => 'No ticket matches these filters.',
        'all_statuses' => 'All statuses',
        'all_priorities' => 'All priorities',
        'filter_status' => 'Filter by status',
        'filter_priority' => 'Filter by priority',
        'columns' => [
            'title' => 'Title',
            'requester' => 'Requester',
            'assigned_technician' => 'Assigned technician',
            'status' => 'Status',
            'priority' => 'Priority',
            'comments_count' => 'Comments',
            'created_at' => 'Created at',
        ],
        'sort_by' => 'Sort by :column',
        'unassigned' => 'Unassigned',
    ],

    'form' => [
        'create_heading' => 'New ticket',
        'edit_heading' => 'Edit ticket',
        'title' => 'Title',
        'description' => 'Description',
        'priority' => 'Priority',
        'technician' => 'Technician',
        'submit' => 'Save',
        'assign' => 'Assign',
        'attachment' => 'Attachment',
        'attach' => 'Attach',
        'attachments_heading' => 'Attachments',
        'no_attachment' => 'No attachment yet.',
    ],

    'messages' => [
        'created' => 'Ticket created.',
        'updated' => 'Ticket updated.',
        'assigned' => 'Ticket assigned.',
        'attached' => 'File attached.',
    ],

    'validation' => [
        'title_required' => 'A title is required.',
        'title_max' => 'The title may not be longer than :max characters.',
        'description_required' => 'A description is required.',
        'priority_required' => 'A priority is required.',
        'priority_enum' => 'This priority does not exist.',
        'attachment_required' => 'A file is required.',
        'attachment_file' => 'The attachment must be a file.',
        'attachment_max' => 'The attachment may not be larger than :max kilobytes.',
    ],

    'exceptions' => [
        'invalid_status_transition' => 'A ticket cannot move from :from to :to.',
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
