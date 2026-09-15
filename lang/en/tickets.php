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

    'console' => [
        'examined' => 'Examined',
        'escalated' => 'Escalated',
        'flagged' => 'Flagged',
    ],

    'import' => [
        'heading' => 'Import tickets',
        'file' => 'CSV file',
        'submit' => 'Import',
        'queued' => 'The import has been queued.',
        'unknown_requester' => 'No user matches the email address :email.',
        'rows_read' => 'Rows read',
        'rows_created' => 'Tickets created',
        'rejections' => 'Rejected rows',
        'line' => 'Line :line: :reason',
        'pending' => 'The import is still running.',
        'file_required' => 'A CSV file is required.',
        'file_mimes' => 'The file must be a CSV file.',
    ],

    'exceptions' => [
        'invalid_status_transition' => 'A ticket cannot move from :from to :to.',
    ],

    'notifications' => [
        'channels' => [
            'urgency' => 'Urgent ticket notification',
            'alert' => 'Critical ticket alert',
        ],

        'escalated' => [
            'subject' => 'A ticket went past its target',
            'introduction' => 'The ticket ":title" went past its resolution target.',
            'priority' => 'Its priority is now: :priority',
            'action' => 'View tickets',
        ],

        'assigned' => [
            'subject' => 'A ticket has been assigned to you',
            'introduction' => 'A ticket has been assigned to you.',
            'ticket_title' => 'Title: :title',
            'action' => 'View ticket',
        ],
    ],
];
